
// Monkii bars gulpfile
// ------------------------
// Usage: 'gulp'

'use strict';

// Library includes
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    svgStore     = require('gulp-svgstore'),
    imageMin     = require('gulp-imagemin'),
    cleanCSS     = require('gulp-clean-css'),
    sourceMaps   = require('gulp-sourcemaps'),
    autoPrefixer = require('gulp-autoprefixer');


// Path config
var paths = {
    styles: {
        src:  './scss/**/*.scss',
        dest: './build/css'
    },
    scripts: {
        app: {
            src:  './js/**/*.js',
            dest: './build/js'
        },
        vendor: {
            src:  [
                './node_modules/jquery/dist/jquery.min.js', // Always include jquery first
                './js/vendor/**/*.js'
            ],
            dest: './build/js'
        }
    },
    icons: {
        src:  './svg/icons/*.svg',
        dest: './build/svg'
    },
    fonts: {
        src:  './fonts/**/*.{ttf,woff,eof,svg}',
        dest: './build/fonts'
    }
};


// Create variables that have a list of tasks to run for the different builds
var styleBuild = gulp.series(style, minifyCss),
    scriptsBuild = gulp.parallel(scriptsApp, scriptsVendor),
    iconsBuild = icons,
    fontsBuild = fonts;

// Exposed tasks - You can run these from the cli
// ---------------

// Default task - Builds everything and starts a watch
gulp.task('default', gulp.parallel(styleBuild, scriptsBuild, watch));

// 'svg' task will run the icon build process, doesnt watch after.
gulp.task('svg', iconsBuild);

// 'fonts' task will move the fonts into the build folder
gulp.task('fonts', fontsBuild);

// Private tasks
// -------------


// Style task - Compiles .scss files into .css, creates a source map, then runs
// an auto prefixer on the css.
function style() {
    return gulp.src(paths.styles.src)
    // Start the scss source map
        .pipe(sourceMaps.init())

        // Compile the sass
        .pipe(sass().on('error', sass.logError))

        // Write the source map
        .pipe(sourceMaps.write('.'))

        // Apply the auto prefixer
        .pipe(autoPrefixer())

        // Save a copy of the unminfied css
        .pipe(gulp.dest(paths.styles.dest))
}


// Minify CSS task - Take all of the .css files and create a minified version
// with a .min suffix. Ignores any file with .min already in its filename.
function minifyCss() {
    return gulp.src([paths.styles.dest + '/**/*.css', '!' + paths.styles.dest + '/**/*.min*'])
    // Minify the css
        .pipe(cleanCSS({debug: true, compatibility: '*'}))

        // Add the .min suffix so we know this is the minified file
        .pipe(rename({
            suffix: '.min'
        }))

        // Save a copy of the minified css
        .pipe(gulp.dest(paths.styles.dest));
};


// Scripts App task - Uglifies and concat's app javascript
function scriptsApp() {
    return gulp.src(paths.scripts.app.src)
    // Start the JS source map
        .pipe(sourceMaps.init())

        // Concat all the files to a .min file
        .pipe(concat('app.min.js'))

        // Uglify the JS
        .pipe(uglify())

        // Write the source map
        .pipe(sourceMaps.write('.'))

        // Output to dest folder
        .pipe(gulp.dest(paths.scripts.app.dest));
}


// Scripts Vendor task - Uglifies and concat's vendor javascript
function scriptsVendor() {
    return gulp.src(paths.scripts.vendor.src)
    // Start the JS source map
        .pipe(sourceMaps.init())

        // Concat all the files to a .min file
        .pipe(concat('vendor.min.js'))

        // Uglify the JS
        .pipe(uglify())

        // Write the source map
        .pipe(sourceMaps.write('.'))

        // Output to dest folder
        .pipe(gulp.dest(paths.scripts.vendor.dest));
}


// Icons build task - Svgstore combines svg files into one with symbol elements
function icons() {
    return gulp.src(paths.icons.src)
        .pipe(imageMin())
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgStore())
        .pipe(gulp.dest(paths.icons.dest));
}

// Fonts build task - copy all the fonts into the build folder
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}


// Watch task
function watch() {
    // Style watch - Runs 'style' then 'minifyCss' tasks
    gulp.watch(paths.styles.src, styleBuild);

    // Js watches - Runs uglify and concats app and vendor Js
    gulp.watch(paths.scripts.app.src, scriptsBuild);
    gulp.watch(paths.scripts.vendor.src, scriptsBuild);
}
