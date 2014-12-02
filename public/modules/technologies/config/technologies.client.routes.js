'use strict';

// Setting up route
angular.module('technologies').config(['$stateProvider',
	function($stateProvider) {
		// Technologys state routing
		$stateProvider.
		state('technologies', {
			url: '/technologies',
			abstract: true,
			template: '<ui-view/>'
		}).

		state('technologies.index', {
			url: '/index',
			templateUrl: 'modules/technologies/views/list-technologies.client.view.html'
		}).
		state('technologies.new', {
			url: '/create',
			templateUrl: 'modules/technologies/views/create-technology.client.view.html'
		}).
		state('technologies.view', {
			url: '/:technologyId',
			templateUrl: 'modules/technologies/views/view-technology.client.view.html'
		}).
		state('technologies.edit', {
			url: '/:technologyId/edit',
			templateUrl: 'modules/technologies/views/edit-technology.client.view.html'
		});
	}
]);