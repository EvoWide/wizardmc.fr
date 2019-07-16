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

        $time = time();
        $user->logged = uniqid('');
        $token = (new Builder())
            ->issuedAt($time)
            ->expiresAt($time + 120) // TODO CHECKBOX REMEMBER
            ->withClaim('uid', $user->getAuthIdentifier())
            ->identifiedBy($user->logged, true)
            ->getToken($this->signer, $this->key);
        $user->save();

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
        if (!$user || $user->logged !== $logged) {
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
