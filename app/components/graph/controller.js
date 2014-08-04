lodash = require('lodash');

module.exports = ['$scope', '$http', function ($scope, $http) {
  $scope.repos = {};

  var getFollowers = function (user) {
    return $http.get('/api/github/' + user + '/followers');
  };

  var getRepos = function (user) {
    return $http.get('/api/github/' + user + '/repos');
  };

  var getLanguages = function (user, repo) {
    return $http.get('/api/github/' + user + '/' + repo + '/languages');
  };

  window.init = function () {
    getFollowers('tjlav5').success(function (followers) {
      lodash.forEach(followers, function (follower) {
        $scope.repos[follower.login] = {};
        getRepos(follower.login).success(function (repos) {
          lodash.forEach(repos, function (repo) {
            $scope.repos[follower.login][repo.name] = {};
            getLanguages(follower.login, repo.name).success(function (languages) {
              $scope.repos[follower.login][repo.name] = languages;
            });
          });
        });
      });
    });
  };

  // getFollowers('tjlav5').success(function (followers) {
  //   lodash.forEach(followers, function (follower) {
  //     $scope.repos[follower.login] = {};
  //     getRepos(follower.login).success(function (repos) {
  //       lodash.forEach(repos, function (repo) {
  //         $scope.repos[follower.login][repo.name] = {};
  //         getLanguages(follower.login, repo.name).success(function (languages) {
  //           $scope.repos[follower.login][repo.name] = languages;
  //         });
  //       });
  //     });
  //   });
  // });
}];
