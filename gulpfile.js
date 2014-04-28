var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    ngmin = require('gulp-ngmin'),
	clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
	replace = require('gulp-replace'),
	notify = require('gulp-notify'),
	watch = require('gulp-watch'),
	bower = require('gulp-bower-files'),
	rev = require('gulp-rev');
	
var pkg = require('./package.json');

var src = {
    js: ['./app/js/*.js', 'app/**/*.js', '!app/**/*.spec.js'], // Do not include .spec.js test files if you are using that for testing purposes.
	fonts: './app/fonts/*',
    sass: './app/css/scss/*.scss',
	css: ['./app/css/*.css','./app/css/**/**/*.css'],
    views: ['./views/**/*.html', '!./views/index.{html,htm}'],
	index: './views/index.{html,htm}',
	libs: ['./app/libs/*.js','./app/libs/**/*.js'],
    images: ['./app/images/**/*']
};

var build = {
    js: './build/assets/js/',
	css: './build/assets/css/',
	scss: './app/css/scss/build/',
	images: './build/assets/images/',
	fonts: './build/assets/images/',
	libs: './build/assets/vendor/',
    views: './build/views/',
	distroot: './build/'
};

/*
---- Clean Section ----
*/

gulp.task('clean', ['clean:css','clean:js','clean:html','clean:fonts','clean:libs','clean:zip'] , function() {
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
  return gulp.src([build.views + "*.htm*"], {read: false})
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

gulp.task('build', ['build:css','build:js','build:html','build:fonts','build:libs','build:zip'] , function() {
  return gulp.src(src.index, {read: false})
    .pipe(gulp.dest(build.distroot));
});

/* Custom CSS */

gulp.task('build:css', ['build-sass'] , function() {
  gulp.src([src.css, build.scss])
    .pipe(minifyCSS({}))
	.pipe(concat('app'))
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(build.css));
});

gulp.task('build:sass', function(){
	gulp.src(['./app/css/scss/*.scss'])
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest(build.scss));
});

/* JS */

gulp.task('build:js', function() {
  gulp.src(src.js)
	.pipe(ngmin()) // Make the NG code minify safe.
    .pipe(uglify())
    .pipe(concat('app'))
	.pipe(rename({suffix: '.package.min'}))
    .pipe(gulp.dest(build.js));
});

/* Vendor */

gulp.task('build:libs', function() {
	gulp.src(src.libs)
	.pipe(concat('libs.js'))
	.pipe(rename({suffix: '.package'}))
    .pipe(gulp.dest(build.libs));
});

/* Bower Vendor */ 

gulp.task("build:bower-files", function(){
    gulp.src(bower())
    .pipe(concat('bower-vendor.js'))
    .pipe(gulp.dest(build.libs));
});

/* Images */

gulp.task('build:images', function(){
	gulp.src(src.images)
    .pipe(gulp.dest(build.images));
});

/* fonts */

gulp.task('build:fonts', function(){
	gulp.src(src.fonts)
    .pipe(gulp.dest(build.fonts));
});

/* Views */

gulp.task('build:html:views', function(){
	gulp.src(src.views)
    .pipe(gulp.dest(build.views));
});

gulp.task('build:html', ['build:html:views'] , function(){
	gulp.src(src.index)
    .pipe(gulp.dest(build.distroot));
});

/*
---- Zip Section ----
*/

gulp.task('zip', function () {
	gulp.src([settings.build.app + '*', settings.build.app + '**/*'])
		.pipe(zip('build-' + new Date() + '.zip'))
		.pipe(gulp.dest('./zip/'));	 

	setTimeout(function(){	    	
		gulp.run('clean:zip');   
	}, 500); // wait for file creation
});
