/* global app */

'use strict';

app.module('app.filters')
	.filter('max', function() {
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
		}
	)
	.filter('min', function() {
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
		}
	)