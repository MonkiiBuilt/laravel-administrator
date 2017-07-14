
// Monkii bars gulpfile
// ------------------------
// Usage: 'gulp'

'use strict';

// Library includes
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    rename       = require('gulp-rename'),
    filter       = require('gulp-filter'),
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
        src:  './src/scss/**/*.scss',
        dest: './dist/css'
    },
    scripts: {
        app: {
            src:  ['./src/js/**/*.js', '!./src/js/vendor/**/*'],
            dest: './dist/js'
        },
        vendor: {
            src:  [
                './node_modules/jquery/dist/jquery.min.js', // Always include jquery first
                './src/js/vendor/sortablejs/jquery.fn.sortable.js',
            ],
            dest: './dist/js'
        }
    },
    icons: {
        src:  './src/svg/icons/*.svg',
        dest: './src/svg'
    },
    images: {
        src: './src/img/**/*',
        dest: './dist/img'
    },
    svgs: {
        src: [
            './src/svg/**/*',
            // Exclude the icons directory (these should be in a spritesheet)
            '!./src/svg/icons',
            '!./src/svg/icons/**'
        ],
        dest: './dist/svg'
    },
    fonts: {
        src:  './src/fonts/**/*.{ttf,woff,eof,svg}',
        dest: './dist/fonts'
    }
};


// Create variables that have a list of tasks to run for the different builds
var styleBuild = gulp.series(style, minifyCss),
    scriptsBuild = gulp.parallel(scriptsApp, scriptsVendor),
    iconsBuild = gulp.series(icons, svgs),
    imagesBuild = gulp.parallel(images, svgs),
    fontsBuild = fonts;


// Exposed tasks - You can run these from the cli
// ---------------
// Default task - Builds everything and starts a watch
gulp.task('default', gulp.parallel(styleBuild, scriptsBuild, imagesBuild, watch));

// 'build' task will run everything, but wont watch.
gulp.task('build', gulp.series(gulp.parallel(styleBuild, scriptsBuild, iconsBuild, fontsBuild), gulp.parallel(imagesBuild)));

// 'svg' task will run the icon build process, but wont watch.
gulp.task('svg', iconsBuild);


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

        // Apply the auto prefixer
        .pipe(autoPrefixer())

        // Write the source map
        .pipe(sourceMaps.write())

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
    // Create a filter excluding '.min' files from getting minified again
    const minFilter = filter(['**', '!*.min.*'], { restore: true });

    return gulp.src(paths.scripts.vendor.src)
        // Start the JS source map
        .pipe(sourceMaps.init())

        // Concat all the files to a .min file
        .pipe(concat('vendor.min.js'))

        // Apply the filter we created above
        .pipe(minFilter)

        // Uglify the JS
        .pipe(uglify())

        // Restore files from the filter
        .pipe(minFilter.restore)

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

// Images build task - Copy all of the images in 'src/img' into the 'dist/img' folder
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

// SVG build task - Copy all of the images in 'src/svg' into the 'dist/svg' folder, this excludes the 'icons' folder as
// these should be compiled into the 'icons.svg' spritesheet. To compile a new SVG icon spritesheet run the 'icons' task.
function svgs() {
    return gulp.src(paths.svgs.src)
        .pipe(gulp.dest(paths.svgs.dest));
}

// Fonts build task - Copy all the fonts in the 'src/fonts' folder into the 'dist/fonts' folder
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

    // Image watches
    gulp.watch(paths.images.src, imagesBuild);
    gulp.watch(paths.svgs.src, imagesBuild);
}