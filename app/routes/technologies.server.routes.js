'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
 	questions = require('../../app/controllers/questions.server.controller'),
	technologies = require('../../app/controllers/technologies.server.controller');

module.exports = function(app) {
	// Technologies Routes
	app.route('/technologies')
		.get(technologies.list)
		.post(users.requiresLogin, technologies.create);

	app.route('/technologies/:technologyId')
		.get(technologies.read)
		.put(users.requiresLogin, technologies.hasAuthorization, technologies.update)
		.delete(users.requiresLogin, technologies.hasAuthorization, technologies.delete);
	app.route('/technologies/:technologyId/questions/:questionId')
		.put(users.requiresLogin, technologies.hasAuthorization, technologies.update);
	// Finish by binding the article middleware
	app.param('technologyId', technologies.technologyByID);
	app.param('questionId', questions.questionByID);
};