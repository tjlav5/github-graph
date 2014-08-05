var gulp = require('gulp'),
    Q = require('q');

var copyTask = require('./copy'),
    renameTask = require('./rename'),
    javascriptTask = require('./javascript'),
    styleTask = require('./style');

var main = module.exports = function () {
  var deferred = Q.defer();

  Q.all([
    copyTask(),
    renameTask(),
    javascriptTask(),
    styleTask()
  ])
  .then(function () {
    deferred.resolve();
  })

  return deferred.promise;
};

if(require.main === module) {
  main();
}
