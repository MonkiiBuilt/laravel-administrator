<?php
/**
 * @author Jonathon Wallen
 * @date 18/4/17
 * @time 2:38 PM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

namespace MonkiiBuilt\LaravelAdministrator\Middleware;

use Closure;

class LaravelAdministratorMenus
{

    public function handle(\Illuminate\Http\Request $request, Closure $next)
    {

        $route = $request->route()->getName();

        $menus = config('laravel-administrator.menu');

        foreach ($menus as $key => $menu) {
            foreach ($menu as $routeName => $item) {

                /**
                 * If the current route matches either the route name of this menu item or is present in this
                 * menu item's array of children then add an 'active' class to the item's classes array
                 *
                 */
                if ($route == $routeName || (isset($item['children']) && in_array($route, $item['children']))) {
                    $menus[$key][$routeName]['classes'][] = 'active';
                }

                /**
                 * Convert the item's classes array to a string and add that as a new class element to the item
                 */
                if (!empty($menus[$key][$routeName]['classes'])) {
                    $menus[$key][$routeName]['class'] = implode(' ', $menus[$key][$routeName]['classes']);
                }
                else {
                    $menus[$key][$routeName]['class'] = '';
                }
            }
        }

        \View::share('laravelAdministratorMenus', $menus);

        return $next($request);
    }
}