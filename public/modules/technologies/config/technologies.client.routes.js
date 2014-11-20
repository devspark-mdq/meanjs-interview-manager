'use strict';

// Setting up route
angular.module('technologies').config(['$stateProvider',
	function($stateProvider) {
		// Technologys state routing
		$stateProvider.
		state('listTechnologies', {
			url: '/technologies',
			templateUrl: 'modules/technologies/views/list-technologies.client.view.html'
		}).
		state('createTechnology', {
			url: '/technologies/create',
			templateUrl: 'modules/technologies/views/create-technology.client.view.html'
		}).
		state('viewTechnology', {
			url: '/technologies/:technologyId',
			templateUrl: 'modules/technologies/views/view-technology.client.view.html'
		}).
		state('editTechnology', {
			url: '/technologies/:technologyId/edit',
			templateUrl: 'modules/technologies/views/edit-technology.client.view.html'
		});
	}
]);