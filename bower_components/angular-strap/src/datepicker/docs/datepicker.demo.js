'use strict';

angular.module('mgcrea.ngStrapDocs')

.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    weekStart: 1
  });
})

.controller('DatepickerDemoCtrl', function($scope, $http) {

  $scope.selectedDate = new Date();
  $scope.selectedDateNumber = Date.UTC(1986, 1, 22);
  $scope.getType = function(key) {
    return Object.prototype.toString.call($scope[key]);
  };

});
