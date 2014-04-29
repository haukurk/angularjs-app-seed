/*global app*/

app
    .filter('max', function() {
        'use strict';
        return function(input) {
            var out;
            if (input) {
            for (var i in input) {
                if (input[i] > out || out === undefined || out === null) {
                    out = input[i];
                }
            }
        }
        return out;
        };
    })
    .filter('min', function() {
        'use strict';
        return function(input) {
            var out;
            if (input) {
            for (var i in input) {
                if (input[i] < out || out === undefined || out === null) {
                    out = input[i];
                }
            }
        }
        return out;
		};
    });