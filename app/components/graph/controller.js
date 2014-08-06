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

  // window.init = function () {
  //   getFollowers('tjlav5').success(function (followers) {
  //     lodash.forEach(followers, function (follower) {
  //       $scope.repos[follower.login] = {
  //         repos: {},
  //         avatar: follower.avatar_url
  //       };
  //       getRepos(follower.login).success(function (repos) {
  //         lodash.forEach(repos, function (repo) {
  //           $scope.repos[follower.login].repos[repo.name] = {};
  //           getLanguages(follower.login, repo.name).success(function (languages) {
  //             $scope.repos[follower.login].repos[repo.name] = languages;
  //           });
  //         });
  //       });
  //     });
  //   });
  // };

  $scope.users = [{
      name: 'jjengo',
      avatar: 'https://avatars2.githubusercontent.com/u/423500?v=2&s=460',
      group: 0
  }];

  // $scope.users = [{
  //     name: 'varunv',
  //     avatar: 'https://avatars.githubusercontent.com/u/1203137?v=2',
  //     group: 0
  // }];

  $scope.links = [];

  var processFollowers = function (user, desiredDepth) {

    var _desiredDepth = desiredDepth;
    var _rootUser = user;
    var _level = 1;
    var _source = 0;

    var _processFollowers = function (user, level, source) {
      user = user || _rootUser;
      level = level || _level;
      source = source || _source;

      if (level > desiredDepth) {
        return;
      }

      var nodeLength;

      getFollowers(user).success(function (followers) {
        lodash.forEach(followers, function (follower) {
          nodeLength= $scope.users.push({
            name: follower.login,
            avatar: follower.avatar_url,
            group: level
          });
          $scope.links.push({
            source: nodeLength - 1,
            target: source,
            value: 30.0/level
          });
          _processFollowers(follower.login, level + 1, nodeLength - 1);
        });
      });

    };

    return _processFollowers;

  };

  processFollowers('jjengo', 3)();

  // $scope.users = [{
  //     name: 'tjlav5',
  //     avatar: 'https://avatars.githubusercontent.com/u/1452216?v=2',
  //     group: 0
  // },{
  //     name: 'robdoherty2',
  //     avatar: 'https://avatars.githubusercontent.com/u/1452216?v=2',
  //     group: 1
  // }];
  //
  // $scope.links = [{
  //     source: 1,
  //     target: 0,
  //     value: 10
  // }];

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
