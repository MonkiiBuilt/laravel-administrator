
<?php
/**
 * @author Jonathon Wallen
 * @date 13/4/17
 * @time 11:06 AM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */
?>

@extends('laravel-administrator::laravel-administrator.layout')

@section('title', 'Dashboard')

@section('content')
    <h1>Hi there</h1>
    {{ print_r(config('laravel-administrator-menu', 1)) }}
@endsection
