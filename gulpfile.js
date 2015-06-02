var _ = require('lodash');
var browserify = require('browserify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var path = require('path');
var babelify = require("babelify");
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');

gulp.task('build', [ 'web-build' ]);

gulp.task('web-build', [ 'markup', 'browserify-index' ]);

gulp.task('browserify-index', function () {
  return browserify({
      entries: ['./index.web.js'],
      debug: true
    })
    .transform(babelify)
    .transform(reactify)
    .bundle()
    .pipe(source('index.web.js'))
    .pipe(gulp.dest('./web-dist'));
});

gulp.task('markup', function () {
  return gulp.src('./*.html')
    .pipe(gulp.dest('./web-dist'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'web-dist',
    livereload: true,
    port: 3001
  });
});

gulp.task('watch', function () {
  gulp.watch('./*.html', ['build']);
  gulp.watch('./**/*.js', ['build']);
});

gulp.task('server', ['build', 'connect', 'watch']);

gulp.task('default', ['server']);
