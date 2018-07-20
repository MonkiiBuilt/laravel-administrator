<?php
/**
 * @author Jonathon Wallen
 * @date 13/4/17
 * @time 3:34 PM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

$config = [

    /**
     * Custom title for your dashboard
     */
    'dashboard_title' => 'Dashboard',

    /**
     * Some friendly welcome text for your dashboard.
     */
    'dashboard_welcome' => 'Welcome to your dashboard',

    /**
     * Each menu contains an key => array of menu items with the key being the route name for that item.
     * At the bare minimum we need a label element for each item, optionally the classes element can be
     * used for any specific classes you want added to the anchor element.
     */
    'menu' => [
        'main' => [
            'laravel-administrator-dashboard' => [
                'label' => 'Dashboard',
                'classes' => [],
            ]
        ]
    ]
];

$packagesConfigDirectory = __DIR__ . '/laravel-administrator';

if (is_dir($packagesConfigDirectory)) {
    foreach (glob($packagesConfigDirectory . '/*.php') as $file)
    {
        $packageConfig = include($file);
        $config = array_merge_recursive($config, $packageConfig);
    }
}

return $config;