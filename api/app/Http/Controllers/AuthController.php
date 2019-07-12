<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register()
    {
        $secretKey = '6LdHZ6wUAAAAAPZHDJXTzcvoGDGPbbZ980nUkvTx';
        $recaptchaToken = request('recaptchaToken');

        if (!$recaptchaToken) {
            return response()->json(['error' => 'Une erreur est survenue durant la validation anti robot.']);
        }

        $captchaCheck = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$recaptchaToken}"));
        if (!$captchaCheck->success) {
            return response()->json(['error' => 'Une erreur est survenue durant la validation anti robot.']);
        }

        $credentials = request()->validate([
            'username' => 'required|min:5|max:33|unique:users',
            'password' => 'required|min:8|max:255',
            'email' => 'required|email|unique:users',
        ]);

        $user = new User($credentials);
        $user->uuid = Str::uuid();
        $user->logged = auth()->getToken();
        $user->save();

        return response()->json(['success' => true]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['username', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user()->load('role'));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
