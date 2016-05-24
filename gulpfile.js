'use strict'
var gulp = require('gulp');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var jade = require('gulp-jade');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

var tplPath = './';

gulp.task('styles-clean', function () {
	return gulp.src(tplPath + '/app/*.css', { read: false })
		.pipe(clean());
});

gulp.task('styles', ['styles-clean'], function () {
	gulp.src(tplPath + '/sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('build.css'))
		.pipe(autoprefixer('last 10 versions', '> 1%', 'ie 9'))
		.pipe(gulp.dest(tplPath + '/app/'))
		.pipe(browserSync.stream());
});

gulp.task('jade', function () {
	gulp.src(tplPath + '/jade/*.jade')
		.pipe(plumber())
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(tplPath + './app/'))
		.pipe(browserSync.stream());
});

gulp.task('coffee', function () {
	gulp.src(tplPath + '/coffee/main.coffee', { read: false })
		.pipe(plumber())
		.pipe(browserify({
			transform: ['coffeeify'],
			extensions: ['.coffee'],
			shim: require('./shim-browserify.json')
		}))
		.pipe(rename('build.js'))
		.pipe(gulp.dest(tplPath + './app/'))
		.pipe(browserSync.stream());
});

gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	});
});

gulp.task('watch', ['jade', 'styles', 'coffee', 'server'], function () {

	gulp.watch(tplPath + '/jade/**/*.jade', ['jade']);
	gulp.watch(tplPath + '/sass/**/*.sass', ['styles']);
	gulp.watch(tplPath + '/coffee/**/*.coffee', ['coffee']);
	gulp.watch(tplPath + '/img/**/*.*').on("change", browserSync.reload);
});

gulp.task('default', ['jade', 'styles', 'coffee']);
