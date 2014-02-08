'use strict';

angular.module('handCoolerApp')
  .controller('GemsCtrl', function ($scope, $http, $routeParams) {
    $scope.pageCount = $routeParams.page || 1;
    $scope.query = $routeParams.query;
    $scope.doSearch = function () {
      var searchApi = new URI('http://cornflower.herokuapp.com/rubygems.org/api/v1/search.json');
      searchApi.search({ query: $scope.query, page: $scope.pageCount });
      $http.get(searchApi).success(function(data) {
        $scope.gems = data;
      });
    };
    $scope.doSearch();
  });
