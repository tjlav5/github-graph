var Q = require('q');

var vendorTask = require('./vendor'),
    githubGraphTask = require('./github-graph');

module.exports = function () {
  var deferred = Q.defer();

  Q.all([
    vendorTask(),
    githubGraphTask()
  ])
  .then(function () {
    deferred.resolve();
  })

  return deferred.promise;
};
