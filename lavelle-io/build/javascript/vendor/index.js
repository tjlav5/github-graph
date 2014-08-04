var Q = require('q'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    mainBowerFiles = require('main-bower-files');

module.exports = function () {

  var deferred = Q.defer();
  
  gulp.src(mainBowerFiles())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    });

  return deferred.promise;
};