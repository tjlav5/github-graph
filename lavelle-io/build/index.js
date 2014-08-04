var gulp = require('gulp'),
    Q = require('q');

// gulp.src('app/**')
//   .pipe(gulp.dest('.tmp'));

module.exports = function () {
  var deferred = Q.defer();

  gulp.src('app/**')
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    });

  deferred.resolve();

  return deferred.promise;
};
