<?php

namespace MonkiiBuilt\LaravelAdministrator;

use Request;

class Tab
{
    public $title;
    public $href;
    public $attributes = ['class' => ['tabs__link']];
    public $weight;

    public function __construct($title, $href, $weight = null)
    {
        $this->title = $title;
        $this->href = $href;
        $this->weight = $weight;
    }

    public function isActive() {
        return Request::path() == trim($this->href, '/');
    }

    public function setId($id) {
        $this->href = str_replace('{id}', $id, $this->href);
    }

    public function render() {
        return '<a href="' . $this->href . '"' . $this->getAttributes() . '>' . $this->title . '</a>';
    }

    private function getAttributes() {
        $out = '';
        foreach ($this->attributes as $attribute => $data) {
            $data = implode(' ', (array) $data);
            $out .= ' ' . $attribute . '="' . htmlspecialchars($data, ENT_QUOTES, 'UTF-8') . '"';
        }
        return $out;
    }
}
