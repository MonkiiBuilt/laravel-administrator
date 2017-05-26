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

    public function handle(\Illuminate\Http\Request $request, Closure $next)
    {

        $config = $this->packageRegistry->getConfigs();

        $route = $request->route()->getName();

        $menus = $config['menu'];

        foreach ($menus as $key => $menu) {
            foreach ($menu as $routeName => $item) {
                if ($route == $routeName) {
                    $menus[$key][$routeName]['classes'][] = 'active';
                }

                if (!empty($menus[$key][$routeName]['classes'])) {
                    $menus[$key][$routeName]['class'] = implode(' ', $menus[$key][$routeName]['classes']);
                } else {
                    $menus[$key][$routeName]['class'] = '';
                }
            }
        }

        \View::share('laravelAdministratorMenus', $menus);

        return $next($request);
    }
}