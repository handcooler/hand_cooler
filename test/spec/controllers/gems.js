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

  it('should get 200', function(){
    httpBackend.expectGET('/foo.json').respond({data: 'invalid'});
    ctrl = controllerService('GemsCtrl', { $scope: scope });
    httpBackend.flush();
    expect(scope.data).toBe('invalid');
  });
});
