'use strict';

angular.module('handCoolerApp')
  .controller('GemsCtrl', function ($scope, $http) {
    $http.get('gems/gems-latest.jspn').success(function(data) {
      $scope.gems = data;
    });
  });
