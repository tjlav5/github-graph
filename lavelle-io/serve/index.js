var express = require('express'),
    logfmt = require('logfmt'),
    gulp = require('gulp'),
    modRewrite = require('connect-modrewrite'),
    serveStatic = require('serve-static'),
    connectLivereload = require('connect-livereload'),
    gulpLivereload = require('gulp-livereload'),
    server = require('../../server'),
    buildTask = require('../build');

server();

var reload = gulpLivereload();

gulp.watch('app/**').on('change', function(file) {
  console.log('change detected', file);
  buildTask().then(function () {
   reload.changed(file.path);
  });
});
