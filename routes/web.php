<?php
/**
 * @author Jonathon Wallen
 * @date 12/4/17
 * @time 2:56 PM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */


Route::group(['prefix' => 'admin', 'namespace' => 'MonkiiBuilt\LaravelAdministrator', 'as' => 'laravel-administrator'], function () {

    Route::get('/', function(Request $request) {

        $menu = config();
        return view('laravel-administrator::laravel-administrator.index', ['menu' => $menu]);

    });

});