<?php
/**
 * @author Jonathon Wallen
 * @date 12/4/17
 * @time 2:56 PM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */


Route::group(['prefix' => 'admin', 'namespace' => 'MonkiiBuilt\LaravelAdministrator', 'middleware' => ['laravel-administrator-menus', 'web', 'auth']], function () {

    Route::get('/', ['uses' => 'Controllers\DashboardController@index', 'as' => 'laravel-administrator-dashboard']);

    Route::get('/debug', ['uses' => 'Controllers\DashboardController@debug', 'as' => 'laravel-administrator-dashboard-debug']);

});