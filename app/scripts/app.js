'use strict';

angular.module('handCoolerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/gems', {
        templateUrl: 'views/gems.html',
        controller: 'GemsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
