/*global app*/

app.factory('ExampleService', function () {
    'use strict';
    return {
            getVersion: function()
            {
                return "0.1";
            }
    };
});