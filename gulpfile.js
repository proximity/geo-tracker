var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var combiner = require('stream-combiner2');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

gulp.task('css', function() {
	var combined = combiner.obj([
		gulp.src('./less/master.less'),
		less(),
		autoprefixer(),
		minify(),
		gulp.dest('./css'),
	]);

	combined.on('error', gutil.log.bind(gutil));

	return combined;
});

gulp.task('watch', ['css', 'js'], function() {
	watch('./less/**/*.less', function() {
		gulp.start('css');
	});

	var bundler = watchify(browserify('./js/main.js', watchify.args));

	bundler.on('update', bundle);
	bundler.on('log', gutil.log);

	function bundle() {
		return bundler.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest('./js'));
	}

	return bundle();
});

gulp.task('js', function() {
	var bundler = browserify('./js/main.js');

	return bundler.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});

