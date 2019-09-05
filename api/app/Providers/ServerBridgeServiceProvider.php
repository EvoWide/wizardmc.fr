<?php

namespace App\Providers;

use App\Services\Server\JsonapiBridge;
use App\Services\Server\ServerBridge;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class ServerBridgeServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(ServerBridge::class, function ($app) {
            return new JsonapiBridge(config('jsonapi'));
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    public function provides()
    {
        return [ServerBridge::class];
    }
}
