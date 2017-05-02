<?php
/**
 * @author Jonathon Wallen
 * @date 18/4/17
 * @time 2:38 PM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

namespace MonkiiBuilt\LaravelAdministrator\Middleware;

use Closure;

class LaravelAdministratorMenus {

    protected $packageRegistry;

    public function __construct(\MonkiiBuilt\LaravelAdministrator\PackageRegistry $packageRegistry)
    {
        $this->packageRegistry = $packageRegistry;
    }

    public function handle($request, Closure $next)
    {

        $config = $this->packageRegistry->getConfigs();


        $menus = $config['menu'];

        \View::share('laravelAdministratorMenus', $menus);

        return $next($request);
    }
}