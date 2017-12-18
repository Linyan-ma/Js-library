var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util');
minify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    paths = {
        'index': ['program/*.html', 'program/**/*.json', 'program/**/*.+(jpg|png|gif)', 'program/**/**/*.+(eot|svg|ttf|woff)'],
        'html': ['program/data/**/*.html'],
        'image': ['program/**/*.+(jpg|png|gif)'],
        'scss': ['program/**/*.scss'],
        'css': ['program/**/*.css', 'program/**/*.min.css'],
        'js': ['program/**/**/*.js'],
        'font': ['program/**/**/*.+(eot|svg|ttf|woff)']
    };
gulp.task('index', function () {
    return gulp.src(paths.index)
        .pipe(gulp.dest('publish'))
});
// gulp.task('scss', function() {
//   return sass('program/styles/scss/**/*.scss')
//     .on('error', sass.logError)
//     .pipe(sourcemaps.write())
//     .pipe(sourcemaps.write('maps', {
//       includeContent: false,
//       sourceRoot: 'source'
//     }))
//     .pipe(gulp.dest('program/styles/css'));
// });
// gulp.task('scss', () =>
// 	sass('program/styles/scss/**/*.scss')
// 		.on('error', sass.logError)
// 		.pipe(gulp.dest('program/styles/css'))
// );
gulp.task('scss', function () {
    return gulp.src('program/style/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('program/style/css'));
});
gulp.task('minify', function () {
    return gulp.src(paths.css)
        .pipe(minify())
        .pipe(gulp.dest('publish'));
});
gulp.task('uglify', function () {
    return gulp.src(paths.js)
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('publish'))
});

gulp.task('watch', function () {
    gulp.watch(paths.scss, ['scss']);
});

gulp.task('browsersync', function () {
    var files = [
        '**/*.js',
        '**/*.scss',
        '**/*.css',
        '**/*.json',
        '**/*.html'
    ];
    browserSync.init(files, {
        server: {
            baseDir: './'
        },
        notify: false
    });
});


gulp.task('dev', ['watch'], function () {
    gulp.start('browsersync');
    gulp.start('scss');
});

gulp.task('default', function () {

    gulp.start('scss');
    gulp.start('index');
    gulp.start('minify');
    gulp.start('uglify');
    gulp.start('browsersync');
});