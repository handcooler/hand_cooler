'use strict';

angular.module('handCoolerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'mgcrea.ngStrap',
  'angularytics',
  'ngSocial'
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
  .controller('HeaderCtrl', function ($scope, $location, $http) {
    $scope.doSearch = function (query) {
      $location.path('/search/' + query);
    };

    $scope.selectedAddress = '';
    $scope.getAddress = function(viewValue) {
      var searchApi = new URI('http://cornflower.herokuapp.com/rubygems.org/api/v1/search.json');
      searchApi.search({ query: viewValue, page: 1 });
      return $http.get(searchApi)
        .then(function(res) {
          return res.data;
        });
    };
  })
  .factory('detectRepos', function(){
    return {
      uri: function(searchRubygemsOrg){
        /*jshint camelcase: false */
        if(searchRubygemsOrg.source_code_uri && URI(searchRubygemsOrg.source_code_uri).hostname() === 'github.com') {
          return searchRubygemsOrg.source_code_uri;
        } else if(searchRubygemsOrg.homepage_uri && URI(searchRubygemsOrg.homepage_uri).hostname() === 'github.com') {
          return searchRubygemsOrg.homepage_uri;
        } else {
//        search from github api?
          return false;
        }
      }
    };
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
