<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// For development
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

Route::group([
    'middleware' => 'ajax',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('login-admin', 'AuthController@loginAdmin');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
});

Route::group([
    'middleware' => ['ajax', 'auth:api', 'role:Administrateur'],
    'prefix' => 'admin'
], function ($router) {
    Route::resource('user', 'Admin\UserController');
});