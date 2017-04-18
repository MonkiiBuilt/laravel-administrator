<?php
/**
 * @author Jonathon Wallen
 * @date 18/4/17
 * @time 10:23 AM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */
?>
<nav class="nav  dashboard">
    <div class="wrapper">
        @foreach($menu as $text => $route)
            <a href="{{ route($route) }}">{{ $text }}</a>
        @endforeach
    </div>
</nav>

