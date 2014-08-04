var Q = require('q'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

module.exports = function () {

  var deferred = Q.defer();

  gulp.src(['app/github-graph.scss', 'app/**/*.scss'])
    .pipe(concat('github-graph.scss'))
    .pipe(sass())
    .pipe(rename('github-graph.min.css'))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    });

  return deferred.promise;
};
