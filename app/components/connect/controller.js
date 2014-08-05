var url = require('url');

module.exports = ['$scope', '$location', '$http', function ($scope, $location, $http) {
  $scope.goToGithub = function () {
    // var _url = url.format({
    //   protocol: 'https',
    //   hostname: 'github.com',
    //   pathname: 'login/oauth/authorize',
    //   query: {
    //     client_id: 'b5272c9d909918307d88',
    //     redirect_uri: 'http://localhost:5000/api/github/authorize'
    //   }
    // });
    // window.location = _url;
    $http.get('/api/github/authorize').success(function (data) {
      window.location = data;
    })
  };
}];
