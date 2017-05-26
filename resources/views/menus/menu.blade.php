<?php
/**
 * @author Jonathon Wallen
 * @date 18/4/17
 * @time 10:23 AM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */
?>
<nav class="nav">
    <div class="wrapper">
        @foreach($menu as $routeName => $item)
            <a href="{{ route($routeName) }}" class="{{ $item['class'] }}">{{ $item['label'] }}</a>
        @endforeach
    </div>
</nav>

