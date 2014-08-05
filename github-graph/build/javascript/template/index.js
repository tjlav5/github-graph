var Q = require('q');

var cacheTask = require('./cache'),
    concatenationTask = require('./concatenation'),
    cleanTask = require('./clean');

module.exports = function () {
  var deferred = Q.defer();

  Q.all([
    cacheTask()
  ])
  .then(function () {
    return concatenationTask();
  })
  .then(function () {
    return cleanTask();
  })
  .then(function () {
    deferred.resolve();
  });

  return deferred.promise;
};
