module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('connect', {
        url: "/connect",
        views: {
          'main': {
            templateUrl: '/components/connect/index.html',
            controller: 'ConnectController'
          }
        }
      })
      .state('authenticate', {
        url: "/authenticate?code",
        views: {
          'main': {
            templateUrl: '/components/authorize/index.html',
            controller: 'AuthorizeController'
          }
        }
      })
      .state('app', {
        url: "/:rootUser",
        views: {
          'main': {
            templateUrl: '/components/wrapper/main.html'
          },
          'graph@app': {
            templateUrl: '/components/graph/index.html',
            controller: 'GraphController'
          }
        }
      });
    }
  ];
