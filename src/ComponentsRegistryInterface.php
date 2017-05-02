<?php
/**
 * @author Jonathon Wallen
 * @date 28/4/17
 * @time 2:21 PM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

namespace MonkiiBuilt\LaravelAdministrator;


interface ComponentsRegistryInterface {

    public function registerConfig($config);

    public function registerPackage($package);

    public function getPackages();

    public function getConfigs();

}