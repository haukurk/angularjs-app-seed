/*global app*/

'use strict';

app.factory('ExampleService', function () {
    return {
            getVersion: function()
            {
				var version = "0.1";
                return version;
            }
    };
});