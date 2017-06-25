<?php
/**
 * @author Jonathon Wallen
 * @date 18/4/17
 * @time 10:23 AM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */
?>
@foreach($menu as $routeName => $item)
    <li><a href="{{ route($routeName) }}" class="{{ $item['class'] }}">{{ $item['label'] }}</a></li>
@endforeach

