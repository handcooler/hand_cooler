'use strict';

describe('Controller: GemsCtrl', function () {

  // load the controller's module
  beforeEach(module('handCoolerApp'));

  var controllerService,
    scope,
    httpBackend,
    ctrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    controllerService = $controller;
    httpBackend = $httpBackend;
  }));

  it('should adjust invalid response', function(){
    var uri = 'http://cornflower.herokuapp.com/rubygems.org/api/v1/search.json?query=formatter&page=1';
    var routeParams = { query: 'formatter' };
    httpBackend.expectGET(uri).respond(404, '');
    ctrl = controllerService('GemsCtrl', { $scope: scope, $routeParams: routeParams });
    httpBackend.flush();
    expect(scope.gems).toBe('Request Failed');
  });
});
