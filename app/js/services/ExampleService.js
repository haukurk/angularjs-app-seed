/* global app */

'use strict';

app.factory('ExampleService', function () {
    return {
            getVersion: function() {
				version = "0.1"
                return version;
            }
    };
});