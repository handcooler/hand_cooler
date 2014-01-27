'use strict';

angular.module('handCoolerApp')
  .controller('GemDetailCtrl', function ($scope, $http, $routeParams) {
    $scope.gemName = $routeParams.gemName;
//    $http.get('gems/tachikoma.json').success(function(data) {
//      $scope.detail = data;
//    });
    $scope.detectRepos = function(data) {
      /*jshint camelcase: false */
      if(data.source_code_uri && URI(data.source_code_uri).hostname() === 'github.com') {
        return data.source_code_uri;
      } else if(data.homepage_uri && URI(data.homepage_uri).hostname() === 'github.com') {
        return data.homepage_uri;
      } else {
//        search from github api?
        return false;
      }
    };

    $scope.fetchReadme = function(url) {
      var uri = URI(url);
      var readmeApi = 'http://cornflower.herokuapp.com/readme/github.com/' + uri.segment(0) + '/' + uri.segment(1);
      $http.get(readmeApi).success(function(data) {
        $scope.readme = data;
      });
    };

    $scope.fetchTags = function(url) {
      var uri = URI(url);
      var tagsApi = 'http://cornflower.herokuapp.com/tags/github.com/' + uri.segment(0) + '/' + uri.segment(1) + '.json';
      $http.get(tagsApi).success(function(data) {
        $scope.tags = data;
      });
    };
    var gemApi = 'http://cornflower.herokuapp.com/rubygems.org/api/v1/gems/' + $routeParams.gemName + '.json';
    $http.get(gemApi).success(function(data) {
      $scope.detail = data;
      $scope.sourceUrl = $scope.detectRepos(data);
      $scope.fetchReadme($scope.sourceUrl);
      $scope.fetchTags($scope.sourceUrl);
    });
  });
