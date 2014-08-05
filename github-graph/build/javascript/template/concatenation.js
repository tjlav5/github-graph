var path = require('path'),
    Q = require('q'),
    gulp = require('gulp'),
    concat = require('gulp-concat');

module.exports = function () {

  var deferred = Q.defer();

  gulp.src([
    '.tmp/github-graph.min.js',
    '.tmp/github-graph.tpl.js'
    ])
    .pipe(concat('github-graph.min.js'))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    });

  return deferred.promise;

};
