'use strict';

angular.module('handCoolerApp')
  .controller('GemsCtrl', function ($scope, $http, $routeParams) {
    $scope.pageCount = $routeParams.page || 1;
    $scope.query = $routeParams.query;
    var searchApi = 'http://cornflower.herokuapp.com/rubygems.org/api/v1/search.json?query=' + $routeParams.query + '&page=' + $scope.pageCount;
    $http.get(searchApi).success(function(data) {
      $scope.gems = data;
    });
});
