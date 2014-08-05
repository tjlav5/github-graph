module.exports = ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
  $http.post('/api/github/authenticate', {
    code: $stateParams.code
  }).success(function () {
    window.location = 'http://localhost:5000/tjlav5';
  });
}];
