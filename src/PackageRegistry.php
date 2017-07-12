<?php
/**
 * @author Jonathon Wallen
 * @date 28/4/17
 * @time 11:04 AM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */

namespace MonkiiBuilt\LaravelAdministrator;


/**
 * Class PackageRegistry
 * @package MonkiiBuilt\LaravelAdministrator
 */
class PackageRegistry implements ComponentsRegistryInterface
{

    /**
     * @var array
     */
    protected $packages= [];

    /**
     * @var array
     */
    protected $configs = [];

    /**
     * @var array
     */
    protected $tab_groups = [];

    /**
     * @return array
     */
    public function getPackages()
    {
        return $this->packages;
    }

    /**
     * @return array
     */
    public function getConfigs()
    {
        $config = [];
        foreach ($this->configs as $filename) {

            if (file_exists($filename)) {
                $config = array_merge_recursive($config, require($filename));
            }
        }
        return $config;
    }

    /**
     * @param $namespace
     */
    public function registerPackage($namespace)
    {
        $this->packages[] = $namespace;
    }

    /**
     * @param $config
     */
    public function registerConfig($config)
    {
        $this->configs[] = $config;
    }

    /**
     * @param $title
     * @param $href
     * @param $group
     * @param null $position - can be first, last or null for auto
     */
    public function registerTab($title, $href, $group, $position = null)
    {
        $this->tab_groups[$group] = isset($this->tab_groups[$group]) ? $this->tab_groups[$group] : new TabGroup($group);
        $this->tab_groups[$group]->createTab($title, $href, $position);
    }

    /**
     * @param $group
     * @param $id
     * @return mixed
     */
    public function getTabs($group, $id)
    {
        if(isset($this->tab_groups[$group])) {
            $tabGroup = $this->tab_groups[$group];
            return $tabGroup->render($id);
        }
    }
}
