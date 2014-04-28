/*global app*/

app.directive('ExampleDirective', ['ExampleService'], function(ExampleService) {
        return {

            // required to make it work as an element
            restrict: 'E',
            template: '<p></p>',
            replace: true,

            // observe and manipulate the DOM
            link: function($scope, element, attrs) {
			
				ExampleService.getVersion
			
            }
        }

    });