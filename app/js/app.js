/*global angular*/

var app = 
	angular.module('seedapp',
                ['ngCookies',
                'ngResource',
                'ngSanitize',
                'ngRoute',
                'ngAnimate',
                'ui.bootstrap', // Directives for Bootstrap from http://angular-ui.github.io/bootstrap/
                'angularMoment']); // Directives for MomentJS from https://github.com/urish/angular-moment

app.config(
	['$routeProvider', '$locationProvider', '$httpProvider', 
	function ($routeProvider, $locationProvider, $httpProvider) 
	{
		'use strict';

		// Example routeProvider
		$routeProvider
		.when('/home', {
			templateUrl: 'templates/home.html'
		})
		.otherwise({
			redirectTo: '/home'
		});

		// Set ! hash prefix for locationProvider.
		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work properly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		
		// I include this here if you want to use a CSRF-Token for POST communication.
		// $httpProvider.defaults.headers.post['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
	
	}]);