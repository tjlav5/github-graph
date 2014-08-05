var Q = require('q');

var vendorTask = require('./vendor'),
    githubGraphTask = require('./github-graph'),
    templateTask = require('./template');

module.exports = function () {
  var deferred = Q.defer();

  Q.all([
    vendorTask(),
    githubGraphTask()
  ])
  .then(function () {
    return templateTask();
  })
  .then(function () {
    deferred.resolve();
  })

  return deferred.promise;
};
