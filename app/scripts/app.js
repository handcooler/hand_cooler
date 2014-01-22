'use strict';

angular.module('handCoolerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'mgcrea.ngStrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/gems/:query/', {
        templateUrl: 'views/gems.html',
        controller: 'GemsCtrl'
      })
      .when('/gems/:query/:page', {
        templateUrl: 'views/gems.html',
        controller: 'GemsCtrl'
      })
      .when('/gem/:gemName', {
        templateUrl: 'views/gem_detail.html',
        controller: 'GemDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
