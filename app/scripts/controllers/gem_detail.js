'use strict';

angular.module('handCoolerApp')
  .controller('GemDetailCtrl', function ($scope, $http, $routeParams) {
    $scope.gemName = $routeParams.gemName;
//    $http.get('gems/tachikoma.json').success(function(data) {
//      $scope.detail = data;
//    });
    $scope.detectRepos = function(data) {
      if(data.source_code_uri && URI(data.source_code_uri).hostname() === 'github.com') {
        return data.source_code_uri;
      } else if(data.homepage_uri && URI(data.homepage_uri).hostname() === 'github.com') {
        return data.homepage_uri;
      } else {
//        search from github api?
        return false;
      }
    };
    var gemApi = 'http://cornflower.herokuapp.com/rubygems.org/api/v1/gems/' + $routeParams.gemName + '.json';
    $http.get(gemApi).success(function(data) {
      $scope.detail = data;
      $scope.sourceUrl = $scope.detectRepos(data);
    });
  });
