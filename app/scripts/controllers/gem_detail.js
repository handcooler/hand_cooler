'use strict';

angular.module('handCoolerApp')
  .controller('GemDetailCtrl', function ($scope, $http, $routeParams) {
    $scope.gemName = $routeParams.gemName;
    $http.get('gems/tachikoma.json').success(function(data) {
      $scope.detail = data;
    });
  });
