
<?php
/**
 * @author Jonathon Wallen
 * @date 13/4/17
 * @time 11:06 AM
 * @copyright 2008 - present, Monkii Digital Agency (http://monkii.com.au)
 */
?>

@extends('vendor.laravel-administrator.layout')

@section('title', $title)

@section('content')

    <h1>{{ $title }}</h1>
    <p>{{ $welcome }}</p>
@endsection
