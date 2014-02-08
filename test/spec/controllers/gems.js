'use strict';

describe('Controller: GemsCtrl', function () {

  // load the controller's module
  beforeEach(module('handCoolerApp'));

  var controllerService,
    scope,
    httpBackend,
    ctrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $routeParams) {
    scope = $rootScope.$new();
    controllerService = $controller;
    httpBackend = $httpBackend;
    $routeParams.query = 'tachikoma';
  }));

  it('should adjust invalid response', function(){
    var uri = 'http://cornflower.herokuapp.com/rubygems.org/api/v1/search.json?query=tachikoma&page=1';
    httpBackend.expectGET(uri).respond(404, '');
    ctrl = controllerService('GemsCtrl', { $scope: scope });
    httpBackend.flush();
    expect(scope.gems).toBe('Request Failed');
  });
});
