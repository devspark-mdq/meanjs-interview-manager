'use strict';

//Questions service used to communicate Questions REST endpoints
angular.module('questions').factory('Questions', ['$resource',
	function($resource) {
		return $resource('/technologies/:technologyId/questions/:questionId',
		 { technologyId:'@technologyId',questionId: '@_id'},
		  	{
			update: {
				method: 'PUT'
			}
		});
	}
]);