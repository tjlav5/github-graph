var url = require('url');

module.exports = ['$scope', '$location', function ($scope, $location) {
  $scope.goToGithub = function () {
    var _url = url.format({
      protocol: 'https',
      hostname: 'github.com',
      pathname: 'login/oauth/authorize',
      query: {
        client_id: 'b5272c9d909918307d88'
      }
    });
    window.location = _url;
  };
}];
