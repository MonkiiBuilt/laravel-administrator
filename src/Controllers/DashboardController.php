<?php
/**
 * @author Jonathon Wallen
 * @date 18/4/17
 * @time 10:26 AM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

namespace MonkiiBuilt\LaravelAdministrator\Controllers;

use Carbon\Carbon;
use MonkiiBuilt\LaravelPages\Models\Page;
use MonkiiBuilt\LaravelPages\Models\PageSection;
use MonkiiBuilt\LaravelPageSectionsText\Models\PageSectionText;
use Route;

class DashboardController {

    public function index(Route $route)
    {
        return view('vendor.laravel-administrator.index');
    }

    public function debug(Route $route)
    {

        $config = config();

        $sections = PageSection::getSingleTableSubclasses();

        $sections = implode(',', $sections);

        return response($sections);

        $page = Page::find(2);

        $content = '';

        foreach ($page->sections as $section) {
            $content .= $section->data['content'];
        }

        return response(($content));
        return view('vendor.laravel-administrator.index');
    }
}