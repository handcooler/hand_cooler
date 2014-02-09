'use strict';

angular.module('handCoolerApp')
  .controller('GemDetailCtrl', function ($scope, $http, $routeParams, $window) {
    $scope.gemName = $routeParams.gemName;
    if(! $scope.gemName) {
      $scope.siteDescription = true;
      var myArray = ['paperclip', 'appraisal', 'tachikoma', 'omniauth', 'pundit'];
      $scope.exampleGems = myArray;
      $scope.gemName = myArray[Math.floor(Math.random() * myArray.length)];
    }

    $scope.detectRepos = function(searchRubygemsOrg) {
      /*jshint camelcase: false */
      if(searchRubygemsOrg.source_code_uri && URI(searchRubygemsOrg.source_code_uri).hostname() === 'github.com') {
        return searchRubygemsOrg.source_code_uri;
      } else if(searchRubygemsOrg.homepage_uri && URI(searchRubygemsOrg.homepage_uri).hostname() === 'github.com') {
        return searchRubygemsOrg.homepage_uri;
      } else {
//        search from github api?
        return '';
      }
    };

    $scope.fetchReadme = function(url) {
      var uri = URI(url);
      var readmeApi = 'http://cornflower.herokuapp.com/readme/github.com/' + uri.segment(0) + '/' + uri.segment(1);
      $http.get(readmeApi).success(function(data) {
        $scope.readme = data;
      });
    };

    $scope.doCompare = function(tags) {
      var uri = URI($scope.sourceUrl);
      $scope.compareUrl = 'https://github.com/' + uri.segment(0) + '/' + uri.segment(1) + '/compare/' + tags.base + '...' + tags.compare;
      $window.open($scope.compareUrl);
    };

    $scope.fetchTags = function(url) {
      var uri = URI(url);
      var tagsApi = 'http://cornflower.herokuapp.com/tags/github.com/' + uri.segment(0) + '/' + uri.segment(1) + '.json';
      $http.get(tagsApi).success(function(data) {
        $scope.tags = data;
        //default value
        $scope.tags.base = $scope.tags[1];
        $scope.tags.compare = $scope.tags[0];
      });
    };
    var gemApi = 'http://cornflower.herokuapp.com/rubygems.org/api/v1/gems/' + $scope.gemName + '.json';
    $http.get(gemApi).success(function(data) {
      $scope.detail = data;
      $scope.sourceUrl = $scope.detectRepos(data);
      $scope.fetchReadme($scope.sourceUrl);
      $scope.fetchTags($scope.sourceUrl);
    });
  });
