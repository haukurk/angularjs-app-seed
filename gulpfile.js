var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    ngmin = require('gulp-ngmin'),
	clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
	replace = require('gulp-replace'),
	notify = require('gulp-notify'),
	watch = require('gulp-watch'),
    es = require('event-stream'),
    rev = require('gulp-rev-hash'),
    template = require('gulp-template');

/* Set this as true if you want to skip minification etc to debug the code */
var DEBUG_PROJECT = false;

var pkg = require('./package.json');
var bower_root = "./app/bower_components/";
var bower_src = { js: [], css: [], images: [], fonts: []};
function buildBowerSrc(packageLocation, list) { list.push(bower_root+packageLocation); }

/* Source locations */
var src = {
    js: ['./app/js/**/*.js'],
	fonts: './app/fonts/*',
    sass: './app/css/scss/*.scss',
	css: ['./app/css/*.css','./app/css/**/**/*.css'],
    views: ['./app/views/**/*.html', '!./app/views/index.{html,htm}'],
	index: './app/views/index.html}',
	libs: ['./app/libs/*.js','./app/libs/**/*.js'],
    shim: './app/shim/*.js',
    images: ['./app/images/**/*']
};

/* Bower Includes
*  Tip: Do not use minfied version of */
/* Bower - CSS */
buildBowerSrc('fontawesome/css/font-awesome.css',bower_src.css);
buildBowerSrc('ionicons/css/ionicons.css',bower_src.css);
buildBowerSrc('bootstrap/dist/css/bootstrap.css',bower_src.css);
buildBowerSrc('bootstrap/dist/css/bootstrap-theme.css',bower_src.css);
/* Bower - JS */
buildBowerSrc('angular/angular.js',bower_src.js);
buildBowerSrc('angular-animate/angular-animate.js',bower_src.js);
buildBowerSrc('angular-cookies/angular-cookies.js',bower_src.js);
buildBowerSrc('angular-resource/angular-resource.js',bower_src.js);
buildBowerSrc('angular-route/angular-route.js',bower_src.js);
buildBowerSrc('angular-sanitize/angular-sanitize.js',bower_src.js);
buildBowerSrc('jquery/dist/jquery.js',bower_src.js);
buildBowerSrc('moment/moment.js',bower_src.js);
buildBowerSrc('underscore/underscore.js',bower_src.js);
/* Bower - Fonts */
buildBowerSrc('fontawesome/fonts/*.{otf,eot,svg,ttf,woff}',bower_src.fonts);
buildBowerSrc('ionicons/fonts/*.{otf,eot,svg,ttf,woff}', bower_src.fonts);
buildBowerSrc('bootstrap/dist/fonts/*.{otf,eot,svg,ttf,woff}', bower_src.fonts);

/* Build locations */
var build = {
    js: './build/assets/js/',
	css: './build/assets/css/',
	images: './build/assets/images/',
	fonts: './build/assets/fonts/',
	libs: './build/assets/js/',
    views: './build/views/',
	distroot: './build/'
};

/*
---- Clean Section ----
*/

gulp.task('clean', ['clean:css','clean:js','clean:html','clean:fonts','clean:libs'] , function() {
    return gulp.src(build.distroot + "*.{htm,html}")
        .pipe(notify("Cleaned all distribution files."));
});

gulp.task('clean:css', function() {
  return gulp.src([build.css + "*.css", build.css + "**/*.css", build.scss + "*.css"], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:js', function() {
  return gulp.src(build.js + "*.js", {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:html', function() {
  return gulp.src([build.distroot + "*.{html,htm}", build.views + "**/*.{html,htm}"], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:fonts', function() {
  return gulp.src(build.fonts, {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:libs', function() {
  return gulp.src(build.libs, {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:zip', function() {
  return gulp.src(build.zip, {read: false})
    .pipe(clean({force: true}));
});

/* ------------------------------------------ */ 

/* 
---- Build Section ----
*/

gulp.task('build', ['build:css','build:js','build:html','build:fonts','build:js:vendor'] , function() {

});

/* Custom CSS */

gulp.task('build:css', ['build:css:bower'], function() {
  var cssFiles = gulp.src(src.css);
  var sassFiles = gulp.src(src.sass)
  .pipe(sass({ style: 'compressed' }));

  return es.concat(cssFiles, sassFiles)
        .pipe(minifyCSS({}))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(build.css));
});

/* CSS - Bower */

gulp.task('build:css:bower', function() {
  return gulp.src(bower_src.css)
        .pipe(minifyCSS({}))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(build.css));
});

/* JS */

gulp.task('build:js', function() {
  gulp.src(src.js)
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
	.pipe(ngmin()) // Make the NG code minify safe.
    .pipe(uglify({outSourceMap: true, warnings: true}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build.js));
});

/* Custom Vendor */

gulp.task('build:js:vendor', ['build:js:bower','build:js:shim'], function() {
	gulp.src(src.libs)
	.pipe(concat('custom-vendor.js'))
    .pipe(gulp.dest(build.libs));
});

/* Bower Vendor */ 

gulp.task("build:js:bower", function(){
    gulp.src(bower_src.js)
    .pipe(uglify({outSourceMap: true, warnings: false}))
    .pipe(concat('bower-vendor.js'))
    .pipe(gulp.dest(build.libs));
});

/* Shim JS */

gulp.task("build:js:shim", function(){
    gulp.src(src.shim)
    .pipe(gulp.dest(build.libs));
});

/* Images */

gulp.task('build:images', function(){
	gulp.src(src.images)
    .pipe(gulp.dest(build.images));
});

/* Image - Bower */

gulp.task('build:images:bower', function(){
	gulp.src(bower_src.images)
    .pipe(gulp.dest(build.images));
});

/* Fonts */

gulp.task('build:fonts', ['build:fonts:bower'], function(){
	gulp.src(src.fonts)
    .pipe(gulp.dest(build.fonts));
});

/* Fonts - Bower */

gulp.task('build:fonts:bower', function(){
	gulp.src(bower_src.fonts)
    .pipe(gulp.dest(build.fonts));
});

/* Views */

gulp.task('build:html:views', function(){
	gulp.src(src.views)
    .pipe(gulp.dest(build.views));
});

// TODO: Add styles and js dynamically.
gulp.task('build:html', ['build:html:views'] , function(){
	gulp.src('./app/views/index.html')
    .pipe(gulp.dest(build.distroot));
});

/*
---- Main ignition ----
*/

// Default build task
gulp.task('default', ['clean'] , function(){
    gulp.start('watch');
});

// Default build task
gulp.task('watch', ['build'] , function(){
    gulp.watch(src.js, ['build:js']);
    gulp.watch(src.libs, ['build:js:libs']);
    gulp.watch(src.css, ['build:css']);
    gulp.watch(src.sass, ['build:css']);
    gulp.watch(src.views, ['build:html']);
    gulp.watch(src.index, ['build:html']);
    gulp.watch(src.fonts, ['build:fonts']);
    gulp.watch(src.images, ['build:images']);
});