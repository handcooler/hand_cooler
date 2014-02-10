'use strict';

angular.module('handCoolerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'mgcrea.ngStrap',
  'angularytics',
  'ngSocial',
  'siyfion.sfTypeahead'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/gem_detail.html',
        controller: 'GemDetailCtrl'
      })
      .when('/search/:query/', {
        templateUrl: 'views/search.html',
        controller: 'GemsCtrl'
      })
      .when('/search/:query/:page', {
        templateUrl: 'views/search.html',
        controller: 'GemsCtrl'
      })
      .when('/gems/:gemName', {
        templateUrl: 'views/gem_detail.html',
        controller: 'GemDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.doSearch = function (query) {
      $location.path('/search/' + query);
    };
    $scope.exampleData = {
      name: 'accounts',
      remote: 'http://cornflower.herokuapp.com/rubygems.org/api/v1/search.json?query=%QUERY'
    };
    $scope.foo = null;
  })
  .config(function(AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  })
  .run(function(Angularytics) {
    Angularytics.init();
  });
//  .config(function($locationProvider) {
//    $locationProvider.html5Mode(true);
//    $locationProvider.hashPrefix('!');
//  });
