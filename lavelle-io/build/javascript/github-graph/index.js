var Q = require('q'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

module.exports = function () {
  var deferred = Q.defer();

  gulp.src('app/github-graph.js')
    .pipe(browserify())
    .pipe(rename('github-graph.min.js'))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    })

  return deferred.promise;
};
