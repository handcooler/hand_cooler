'use strict';

angular.module('handCoolerApp')
  .controller('GemDetailCtrl', function ($scope, $http, $routeParams) {
    $scope.gemName = $routeParams.gemName;
//    $http.get('gems/tachikoma.json').success(function(data) {
//      $scope.detail = data;
//    });
    var gemApi = 'https://rubygems.org/api/v1/gems/' + $routeParams.gemName + '.json';
    $http.get(gemApi).success(function(data) {
      $scope.detail = data;
    });
  });
