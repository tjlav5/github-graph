var Q = require('q'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    mainBowerFiles = require('main-bower-files'),
    concat = require('gulp-concat');

module.exports = function () {

  var deferred = Q.defer();

  gulp.src(mainBowerFiles({
    paths: {
      bowerDirectory: 'app/lib',
      bowerrc: '.bowerrc',
      bowerJson: 'bower.json'
    }
  }))
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      deferred.resolve();
    });

  return deferred.promise;
};
