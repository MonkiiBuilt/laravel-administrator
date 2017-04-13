<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Administrator Dashboard</title>

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.6/dt-1.10.12/datatables.min.css"/>

    <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />

    <link href="{{ asset('vendor/laravel-administrator/style/css/main.7.css', env('FORCE_HTTPS', false)) }}" rel="stylesheet" type="text/css">

    @yield('styles')

    @php($user = \Auth::user())

    <link href="{{ asset('favicon.ico', env('FORCE_HTTPS', false)) }}" rel="icon" type="image/x-icon" >

</head>
<body class="dashboard">
<div class="inner-body">

    <!-- Header -->
    <header class="header">

        <div class="wrapper">

            <div class="home">
                <a class="logo" href="/admin"><img src="" alt="dashboard"></a>
            </div>

            @if ($user)
            <div class="user">
                <span>Welcome {{ $user->first_name }}!</span>
                <a href="">Edit your account</a>
                <a href="{{ url('/logout') }}">Logout</a>
            </div>
            @endif

        </div>

    </header>

    <!-- Nav -->
    <nav class="nav  dashboard">
        <div class="wrapper">
        </div>
    </nav>


    <div class="wrapper">

        <div class="main-wrapper content">

            @yield('content')
        </div>

    </div><!-- END .wrapper -->

    <!-- Footer -->
    <footer class="footer">

        <div class="wrapper">

            <div class="footer-inner">
                Need some footer content here.
            </div>

        </div>

    </footer>

    <!-- JavaScripts -->
    <script type="text/javascript">
        //<!--
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-798241-1', 'auto');
        ga('send', 'pageview');    //-->
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js" integrity="sha384-I6F5OKECLVtK/BL+8iSLDEHowSAfUo76ZL9+kGAgTRdiByINKJaqTPH/QVNS1VDb" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.6/dt-1.10.12/datatables.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

    <script src="{{ asset('vendor/laravel-administrator/js/build/vendor.min.7.js', env('FORCE_HTTPS', false)) }}"></script>
    <script src="{{ asset('vendor/laravel-administrator/js/build/mb-components.min.7.js', env('FORCE_HTTPS', false)) }}"></script>
    <script src="{{ asset('vendor/laravel-administrator/js/build/components.min.7.js', env('FORCE_HTTPS', false)) }}"></script>
    <script src="{{ asset('vendor/laravel-administrator/js/build/app.min.7.js', env('FORCE_HTTPS', false)) }}"></script>

    @yield('scripts')

    @if (\App::environment('staging'))
    <script type="text/javascript">
        (function() {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = '//api.usersnap.com/load/'+
                    'b9e3f45f-001b-43e2-ba55-a2b50128ff3a.js';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        })();
    </script>
    @endif

</div><!-- END .inner-body -->
</body>
</html>
