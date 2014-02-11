'use strict';

angular.module('handCoolerApp')
  .controller('GemsCtrl', function ($scope, $http, $routeParams, detectRepos) {
    $scope.pageCount = parseInt($routeParams.page, 10) || 1;
    $scope.query = $routeParams.query;
    $scope.getReposUrl = function(gem) {
      return detectRepos.uri(gem);
    };
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
