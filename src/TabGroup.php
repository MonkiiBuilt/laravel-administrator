<?php

namespace MonkiiBuilt\LaravelAdministrator;

class TabGroup
{
    private $name;
    private $tabs = [];
    private $request;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function createTab($title, $href, $position = null)
    {
        $weight = $this->getNewTabWeight($position);
        $tab = new Tab($title, $href, $weight);
        $this->tabs[] = $tab;
    }

    public function render($id) {
        $renderedTabs = [];
        $tabs = $this->getTabs();

        foreach($tabs as $tab) {
            $tab->setId($id);

            $prefix = $tab->isActive() ? '<div class="tabs__tab tabs__tab--active">' : '<div class="tabs__tab">';
            $suffix = '</div>';

            $renderedTabs[] = $prefix . $tab->render() . $suffix;
        }
        $view = view('vendor.laravel-administrator.tabs', ['tabs' => $renderedTabs]);
        return $view->render();
    }

    public function getTabs()
    {
        $this->sortTabs();
        return $this->tabs;
    }

    private function sortTabs()
    {
        usort($this->tabs, [$this, 'cmpWeight']);
    }

    private function cmpWeight($a, $b)
    {
        return $a->weight > $b->weight;
    }

    private function getNewTabWeight($position) {
        if($position == 'first') {
            foreach($this->tabs as $tab) {
                $tab->weight++;
            }
            return 0;
        } else {
            return count($this->tabs);
        }
    }
}
