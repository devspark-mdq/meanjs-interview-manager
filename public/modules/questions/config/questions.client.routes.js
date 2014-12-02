'use strict';

//Setting up route
angular.module('questions').config(['$stateProvider',
	function($stateProvider) {
		// Questions state routing
		$stateProvider.
		state('questions', {
			url: '/technologies/:technologyId/questions',
			abstract: true,
			template: '<ui-view/>'
		}).
		state('questions.index', {
			url: '/index',
			templateUrl: 'modules/questions/views/list-questions.client.view.html'
		}).
		state('questions.create', {
			url: '/create',
			templateUrl: 'modules/questions/views/create-question.client.view.html'
		}).
		state('questions.view', {
			url: '/:questionId',
			templateUrl: 'modules/questions/views/view-question.client.view.html'
		}).
		state('questions.edit', {
			url: '/:questionId/edit',
			templateUrl: 'modules/questions/views/edit-question.client.view.html'
		});
	}
]);