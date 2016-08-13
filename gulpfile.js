var gulp = require('gulp');
var minify = require('gulp-minify');
var lost = require('lost');
var axis = require('axis');
var cssnext = require('postcss-cssnext');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gulpload = require('gulp-load-plugins');
var responsive = require('gulp-responsive');
var stylus = require('gulp-stylus');
var poststylus = require('poststylus');
var rupture = require('rupture');
var imagemin = require('gulp-imagemin');
var $ = require('gulp-load-plugins')();

// CSS Task
// Style html (.styl)
// gulp.task('stylus', function () {
//     return gulp.src('views/css/style.styl')
//         .pipe(stylus({
//             use: [
//                 poststylus(['postcss-cssnext', 'lost']),
//                 axis(),
//                 rupture()
//             ]
//         }))
//         .pipe(rename('style.css'))
//         .pipe(gulp.dest('views/css/style.css'));
// });

// cssnano Task
gulp.task('cssnano', function () {
    return gulp.src('views/css/**/*.css')
        .pipe(plumber())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '-min'
        }))
        .pipe(gulp.dest('views/dist'));
});

// Scripts Task
// Merge and Compress js files
gulp.task('scripts', function () {
	return gulp.src('views/js/**/*.js')
		.pipe(plumber())
		.pipe(minify({
            ext: {
                min: '-min.js'
            },
            noSource: ['main.js'],
        }))
		.pipe(gulp.dest('views/dist'))
});

// Image Compress
gulp.task('compress', function () {
    return gulp.src('views/images/**/*.png')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(rename({
            suffix: '-min'
        }))
        .pipe(gulp.dest('views/dist/images'));
});

// Image Responsive
// Resize and Compress (Desktop 2x-1600px; 1x-800px; 50em)('img/*.{jpg,png}')
gulp.task('responsive', function () {
    return gulp.src('views/images/**/*.png')
      .pipe($.responsive({
//         // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
        '**/*.png': [{
          width: 100,
          rename: { suffix: '-min' },
//         }, {
//           width: 250,
//           rename: { suffix: '-250px' },
//         }, {
//           width: 436,
//           rename: { suffix: '-436px' },
//         }, {
//           // Compress, strip metadata, and rename original image
//           rename: { suffix: '-original' },
//         }],
//         // // Resize all PNG images to be retina ready
//         // '**/*.png': [{
//         //   width: 50,
//         // }, {
//         //   width: 50 * 2,
//         //   rename: { suffix: '@2x' },
        }],
        }, {
//         // Global configuration for all images
//         // The output quality for JPEG, WebP and TIFF output formats
//         quality: 85,
//         // Use progressive (interlace) scan for JPEG and PNG output
//         progressive: true,
//         // Strip all metadata
        withMetadata: false,
        compressionLeverl: 7,
        skipOnEnlargement: true,
        // Do not emit the error when image is enlarged.
        errorOnEnlargement: false,
      }))
      .pipe(gulp.dest('views/dist/images'));
});

//Watch Task
//Watches JS
gulp.task('watch', function() {
    gulp.watch('views/js/**.js', ['scripts']).on('change', browserSync.reload);
//    gulp.watch('images_src/**/**.*', ['image']).on('change', browserSync.reload);
    // gulp.watch("views/css/style.styl", ['stylus']).on('change', browserSync.reload);
    gulp.watch("views/pizza.html").on('change', browserSync.reload);
});

// Serve files from the root of this project
//Browser-Sync
gulp.task('browser-sync', function() {
    browserSync.init(['*.html', 'css/style.css'], {
        server: {
            baseDir: './'
        }
    });
});


gulp.task('default', ['watch', 'browser-sync']);
