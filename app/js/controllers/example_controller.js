/*global app*/

/* Note: Naming convention for controllers are UpperCamelCase. */

app.controller('ExampleCtrl', ['$scope', '$log', function ($scope, $log) {

	'use strict';

	$scope.testMessage = "Example Controller says Hi!";
	
	$scope.serviceExample = "";
	
	$scope.$log = $log;
	
	$log.log('Controller := ExampleCtrl');
	
}]);