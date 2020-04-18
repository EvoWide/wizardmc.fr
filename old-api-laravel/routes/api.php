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

Route::group(['middleware' => 'ajax'], function () {

    Route::group(['prefix' => 'auth'], function () {
        Route::post('register', 'AuthController@register');
        Route::post('login', 'AuthController@login');
        Route::post('login-admin', 'AuthController@loginAdmin');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::get('me', 'AuthController@me');
    });

    Route::group(['prefix' => 'shop'], function () {
        Route::post('view', 'ShopController@view');
        Route::post('buy', 'ShopController@buy')->middleware('auth:api');
    });


    Route::group(['middleware' => ['auth:api', 'role:Administrateur'], 'prefix' => 'admin'], function () {
        Route::resource('user', 'Admin\UserController');
    });


    Route::get('posts', 'PostController@index');
    Route::get('posts/{slug}', 'PostController@show');
});

Route::get('shop/list', 'ShopController@list');
