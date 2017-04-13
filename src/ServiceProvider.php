<?php
/**
 * @author Jonathon Wallen
 * @date 12/4/17
 * @time 2:28 PM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

namespace MonkiiBuilt\LaravelAdministrator;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{

    public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        $this->loadViewsFrom(__DIR__.'/../resources/views/', 'laravel-administrator');

        $this->publishes([
            __DIR__.'/../resources/theme/' => public_path('vendor/laravel-administrator/')
        ], 'administrator-theme');

        $this->publishes([
            __DIR__.'/../resources/views/' => resource_path('views/laravel-administrator')
        ], 'administrator-views');
    }

}