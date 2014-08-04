var gulp = require('gulp'),
    Q = require('q');

// module.exports = function () {
//   var deferred = Q.defer();
//
//   gulp.src('app/**')
//     .pipe(gulp.dest('.tmp'))
//     .on('end', function () {
//       deferred.resolve();
//     });
//
//   deferred.resolve();
//
//   return deferred.promise;
// };

var copyTask = require('./copy'),
    renameTask = require('./rename'),
    javascriptTask = require('./javascript'),
    styleTask = require('./style');

var main = module.exports = function () {
  var deferred = Q.defer();

  Q.all([
    copyTask(),
    renameTask()
    // javascriptTask(),
    // styleTask()
  ])
  .then(function () {
    deferred.resolve();
  })

  return deferred.promise;
};

if(require.main === module) {
  main();
}
