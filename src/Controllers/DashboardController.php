<?php
/**
 * @author Jonathon Wallen
 * @date 18/4/17
 * @time 10:26 AM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

namespace MonkiiBuilt\LaravelAdministrator\Controllers;

use Route;

class DashboardController {

    public function index(Route $route)
    {
        return view('laravel-administrator.index');
    }
}