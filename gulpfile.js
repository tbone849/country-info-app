var gulp = require('gulp');

var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var neat = require('node-neat');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var minifyCss = require('gulp-minify-css');

// run localhost:8080 server
gulp.task('connect', function() {
  connect.server({
    root: './build'
  });
});

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('./app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watch task
gulp.task('watch', ['build'], function() {
  gulp.watch('./app/**/*.html', ['build'] );
  gulp.watch('./app/*.js', ['build']);
  gulp.watch('./app/scss/*.scss', ['build']);
});

// Default task
gulp.task('default', ['jshint', 'styles', 'watch', 'connect']);

// Minify index
gulp.task('html', function() {
  return gulp.src('./app/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('vendor', function() {
  gulp.src('./app/bower-components/**/*')
    .pipe(gulp.dest('build/vendor'));
});

// Build task
gulp.task('build', ['jshint', 'styles', 'scripts', 'html', 'vendor']);