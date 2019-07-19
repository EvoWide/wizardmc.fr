<?php

namespace App\Services\Auth;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Hash;
use App\User;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Builder;
use Exception;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class JwtGuard implements Guard
{

    private $signer;
    private $key;

    private $provider;
    private $request;

    private $user = NULL;
    private $token = NULL;

    private $checked = false;

    /**
     * @param UserProvider $provider
     * @param Request $request
     */
    public function __construct(UserProvider $provider, Request $request)
    {
        $this->provider = $provider;
        $this->request = $request;

        $this->signer = new Sha256();
        $this->key = new Key(env('APP_KEY'));
    }

    /**
     * Determine if the current user is authenticated.
     *
     * @return bool
     */
    public function check()
    {
        if (!$this->checked) {
            $this->checked = true;
            $this->validate();
        }

        return !is_null($this->user());
    }

    /**
     * Determine if the current user is a guest.
     *
     * @return bool
     */
    public function guest()
    {
        return !$this->check();
    }

    /**
     * Get the currently authenticated user.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        return $this->user;
    }

    /**
     * Get the ID for the currently authenticated user.
     *
     * @return int|string|null
     */
    public function id()
    {
        if ($this->check()) {
            return $this->user->getAuthIdentifier();
        }
    }

    /**
     * Validate a user's credentials.
     *
     * @param  array  $credentials
     * @return bool
     */
    public function validate(array $credentials = [])
    {
        if (empty($credentials)) {
            return $this->validateJWT();
        }

        $user = User::where('username', $credentials['username'])->first();
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return false;
        }

        $expireAt = Carbon::now();
        if (request()->get('remember', 0)) {
            $expireAt->addDays(7);
        } else {
            $expireAt->addHours(2);
        }

        $generatedToken = uniqid();
        $token = (new Builder())->issuedAt(time())->expiresAt($expireAt->timestamp)->withClaim('uid', $user->getAuthIdentifier())->identifiedBy($generatedToken, true)->getToken($this->signer, $this->key);
        DB::insert('insert into users_logged (user_id, token, expire_at) values (?, ?, ?)', [$user->id, $generatedToken, $expireAt->toDateTimeString()]);

        $this->setUserAndToken($user, $token->__toString());
        return true;
    }

    private function validateJWT()
    {
        $rawToken = $this->request->header('Authorization');
        if (!$rawToken) {
            return false;
        }

        try {
            $token = (new Parser())->parse($rawToken);
        } catch (Exception $exception) {
            return false;
        }

        if (!$token->verify($this->signer, $this->key) || $token->isExpired()) {
            return false;
        }

        $user_id = $token->getClaim('uid');
        $logged = $token->getHeader('jti');

        $user = $this->provider->retrieveById($user_id);
        if (!$user || !DB::select('select * from users_logged where user_id = ? AND token = ? AND expire_at > NOW()', [$user_id, $logged])) {
            return false;
        }

        $this->setUserAndToken($user, $rawToken);
        return true;
    }

    /**
     * Set the current user.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @return void
     */
    public function setUser(Authenticatable $user)
    {
        $this->user = $user;
    }

    public function setUserAndToken(Authenticatable $user, string $token)
    {
        $this->setUser($user);
        $this->token = $token;
    }

    /**
     * Undocumented function
     *
     * @return string|null
     */
    public function getToken()
    {
        return $this->token;
    }
}
