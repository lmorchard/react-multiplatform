var _ = require('lodash');
var browserify = require('browserify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var path = require('path');
var babelify = require("babelify");
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('build', [ 'web-build' ]);

gulp.task('web-build', [ 'markup', 'browserify-index' ]);

gulp.task('browserify-index', function () {
  return browserify({ entries: ['./index.web.js'], debug: false })
    .transform(babelify)
    .transform(reactify) // Unnecessary? babel handles this?
    .bundle()
    .pipe(source('index.web.js'))
    .pipe(buffer())
    .pipe(uglify())
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
  // NOTE: Be very specific about what files to watch, so that we don't get
  // into a loop with React packager.
  gulp.watch('./index.html', ['build']);
  gulp.watch('./lib/**/*.js', ['build']);
  gulp.watch('./index.web.js', ['build']);
});

gulp.task('server', ['build', 'connect', 'watch']);

gulp.task('default', ['server']);
