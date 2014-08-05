var path = require('path'),
    Q = require('q'),
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf');

module.exports = function () {

  var deferred = Q.defer();

  gulp.src([path.join('.tmp', '*.tpl.js')])
    .pipe(rimraf())
    .on('finish', function () {
      deferred.resolve();
    });

  return deferred.promise;

};
