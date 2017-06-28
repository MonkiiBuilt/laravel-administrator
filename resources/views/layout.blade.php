<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Administrator Dashboard</title>


    <!-- Styles - START -->
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Bootstrap Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- Project CSS -->
    <link href="{{ asset('vendor/laravel-administrator/css/main.css', env('FORCE_HTTPS', false)) }}" rel="stylesheet" type="text/css">

    @yield('styles')
    <!-- Styles - END -->


    @php($user = \Auth::user())

    <link href="{{ asset('favicon.ico', env('FORCE_HTTPS', false)) }}" rel="icon" type="image/x-icon" >

</head>
<body>
    <div class="container">

        <!-- Header - START -->
        <header class="header">

            <nav class="navbar  navbar-default">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="/admin">
                            <img alt="Monkii" src="/vendor/laravel-administrator/img/logo.png" width="50px">
                        </a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            @each('vendor.laravel-administrator.menus.menu', $laravelAdministratorMenus, 'menu')
                        </ul>

                        @if ($user)
                            <ul class="nav navbar-nav navbar-right">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ $user->name }} <span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <!-- <li><a href="/admin/pls/giff/url">Edit your account</a></li> -->
                                        <li role="separator" class="divider"></li>
                                        <!-- <li><a href="{{ url('/logout') }}">Logout</a></li> -->
                                        <li>
                                            <form class="form-horizontal" role="form" method="POST" action="{{ route('logout') }}">
                                                {{ csrf_field() }}

                                                <input type="submit" value="Logout">
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        @endif
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>

        </header>
        <!-- Header - END -->


        <!-- Content - START -->
        <div class="main-content">
            @yield('content')
        </div>
        <!-- Content - END -->

    </div>

    <!-- JavaScript includes - START -->
    <!-- Google analytics -->
    <script type="text/javascript">
        //<!--
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-798241-1', 'auto');
        ga('send', 'pageview');    //-->
    </script>

    <!-- Project vendor JS -->
    <script src="{{ asset('vendor/laravel-administrator/js/vendor.min.js', env('FORCE_HTTPS', false)) }}"></script>

    <!-- CKEditor -->
    <script src="https://cdn.ckeditor.com/4.7.0/standard/ckeditor.js"></script>

    <!-- Bootstrap JS -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <!-- Project app JS -->
    <script src="{{ asset('vendor/laravel-administrator/js/app.min.js', env('FORCE_HTTPS', false)) }}"></script>

    @yield('scripts')
    <!-- JavaScript includes - END -->
</body>
</html>
