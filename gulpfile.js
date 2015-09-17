var _ = require('lodash');
var fs = require('fs');
var browserify = require('browserify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var path = require('path');
var babelify = require("babelify");
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var firefox = require('node-firefox');

gulp.task('default', ['server']);

gulp.task('server', ['build', 'connect', 'watch']);

gulp.task('build', [ 'web-build' ]);

gulp.task('watch', function () {
  // NOTE: Be very specific about what files to watch, so that we don't get
  // into a loop with React packager.
  gulp.watch([
    './index.html',
    './manifest.webapp'
  ], ['copy-assets']);
  gulp.watch('./lib/**/*.js', ['build']);
  gulp.watch('./index.web.js', ['build']);
  //gulp.watch('./web-dist/*', ['deploy-fxos']);
});

gulp.task('web-build', [ 'copy-assets', 'browserify-index' ]);

gulp.task('browserify-index', function () {
  return browserify({ entries: ['./index.web.js'], debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source('index.web.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./web-dist'))
    .pipe(connect.reload());
});

gulp.task('copy-assets', function () {
  return gulp.src([
      './index.html',
      './manifest.webapp'
    ])
    .pipe(gulp.dest('./web-dist'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'web-dist',
    livereload: true,
    port: 3001
  });
});

if (false) gulp.task('deploy-fxos', function() {

  var appPath = 'web-dist';
  var client, appId;

  firefox.findPorts().then(function(availablePorts) {
    return Promise.all(availablePorts.map(install));
  }).then(function (results) {
    console.log(results);
  }).catch(function (err) {
    console.error(err);
  });

  function install(port) {
    var manifest = JSON.parse(fs.readFileSync(appPath + '/manifest.webapp'));
    var client, appId;
    return firefox.connect(port.port).then(function(result) {
      client = result;
      return uninstall(client, manifest);
    }).then(function(result) {
      return firefox.installApp({ client: client, appPath: appPath });
    }).then(function(result) {
      appId = result;
      return launch(client, manifest, appId);
    }).then(function(result) {
      return client.disconnect();
    }).then(function(result) {
      return { port: port, appId: appId };
    });
  }

  function uninstall(client, manifest, appId) {
    return findAppsAndApply(client, manifest, appId, function(app) {
      return firefox.uninstallApp({
        client: client,
        manifestURL: app.manifestURL
      });
    });
  }

  function launch(client, manifest, appId) {
    return findAppsAndApply(client, manifest, appId, function(app) {
      return firefox.launchApp({
        client: client,
        manifestURL: app.manifestURL
      });
    });
  }

  function findAppsAndApply(client, manifest, appId, handler) {
    return firefox.findApp({
      client: client,
      manifest: manifest
    }).then(function(apps) {
      return Promise.all(apps.filter(function (app) {
        return (!appId) || app.id == appId;
      }).map(function (app) {
        return handler(app);
      }));
    });
  }

});
