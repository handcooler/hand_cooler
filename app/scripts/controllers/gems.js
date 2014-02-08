'use strict';

angular.module('handCoolerApp')
  .controller('GemsCtrl', function ($scope, $http, $routeParams) {
    $scope.pageCount = $routeParams.page || 1;
    $scope.query = $routeParams.query;
    $scope.doSearch = function () {
      var searchApi = new URI('http://cornflower.herokuapp.com/rubygems.org/api/v1/search.json');
      searchApi.search({ query: $scope.query, page: $scope.pageCount });
      $http.get(searchApi).
        success(function(data, status) {
          $scope.gems = data;
          $scope.status = status;
          if($scope.pageCount > 1) {
            $scope.doesExistPrev = true;
          }
          if($scope.gems.length === 30) {
            $scope.doesExistNext = true;
          }
        }).
        error(function(data, status) {
          $scope.gems = data || 'Request Failed';
          $scope.status = status;
        });
    };
    $scope.doSearch();
  });
