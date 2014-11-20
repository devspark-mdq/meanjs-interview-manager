'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('technologies').factory('Technologies', ['$resource',
	function($resource) {
		return $resource('technologies/:technologyId', {
			technologyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);