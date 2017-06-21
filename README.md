# laravel-administrator
Basic admin panel

### Installation instructions

Add this to ```"require"``` in composer .json:
 
```"monkiibuilt/laravel-administrator": "dev-master"```
 
 Add this to the end of composer.json
 
 ```
 "repositories": [
     {
         "type": "package",
         "package": {
             "name": "MonkiiBuilt/laravel-administrator",
             "version": "dev-master",
             "source": {
                 "url": "https://github.com/MonkiiBuilt/laravel-administrator.git",
                 "type": "git",
                 "reference": "master"
             },
             "autoload": {
                 "classmap": [""]
             }
         }
     }
 ]
 ```

Run ```composer update```

Run ``php artisan vendor:migrate``

Add this to the providers array in config/app.php

```MonkiiBuilt\LaravelAdministrator\ServiceProvider::class,```

You should now see an admin page at /admin
