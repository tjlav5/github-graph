var Q = require('q'),
    gulp = require('gulp');

var assetGlob = ['app/images/**'];

module.exports = function () {
  var deferred = Q.defer();

  gulp.src(assetGlob)
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    });

  deferred.resolve();

  return deferred.promise;
};
