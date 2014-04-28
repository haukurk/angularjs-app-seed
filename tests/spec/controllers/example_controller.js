'use strict';

describe('Controller: CtrlExampleCtrl', function () {

  // load the controller's module
  beforeEach(module('theApp'));

  var CtrlExampleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CtrlExampleCtrl = $controller('CtrlExampleCtrl', {
      $scope: scope
    });
  }));

  it('should attach stuff default to the scope', function () {
    expect(scope.testMessage).toBe("Example Controller says Hi!");
  });
});
