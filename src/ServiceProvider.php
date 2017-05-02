<?php
/**
 * @author Jonathon Wallen
 * @date 12/4/17
 * @time 2:28 PM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

namespace MonkiiBuilt\LaravelAdministrator;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use App\Http\Kernel;

class ServiceProvider extends BaseServiceProvider
{

    public function register()
    {
        $this->app->singleton('MonkiiBuilt\LaravelAdministrator\PackageRegistry', function($app) {
            return new \MonkiiBuilt\LaravelAdministrator\PackageRegistry();
        });
    }

    public function boot(\MonkiiBuilt\LaravelAdministrator\PackageRegistry $packageRegistry)
    {
        $packageRegistry->registerConfig(config_path() . '/laravel-administrator.php');

        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        $this->loadViewsFrom(__DIR__.'/../resources/views/', 'laravel-administrator');

        $this->publishes([
            __DIR__.'/../resources/theme/' => public_path('vendor/laravel-administrator/')
        ], 'administrator-theme');

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/laravel-administrator/')
        ], 'administrator-views');

        $this->publishes([
            __DIR__. '/../config/laravel-administrator.php' => config_path('/laravel-administrator.php')
        ], 'administrator-config');

        app('router')->aliasMiddleware('laravel-administrator-menus', \MonkiiBuilt\LaravelAdministrator\Middleware\LaravelAdministratorMenus::class);
    }

}