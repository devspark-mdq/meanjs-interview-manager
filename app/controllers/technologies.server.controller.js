'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Technology = mongoose.model('Technology'),
	_ = require('lodash');

/**
 * Create a technology
 */
exports.create = function(req, res) {
	var technology = new Technology(req.body);
	technology.user = req.user;

	technology.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(technology);
		}
	});
};

/**
 * Show the current technology
 */
exports.read = function(req, res) {console.log(req.technology);
	res.json(req.technology);
};

/**
 * Update a technology
 */
exports.update = function(req, res) {console.log(req.technology);
	var technology = req.technology;

	technology = _.extend(technology, req.body);

	technology.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(technology);
		}
	});
};

/**
 * Delete an technology
 */
exports.delete = function(req, res) {
	var technology = req.technology;

	technology.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(technology);
		}
	});
};

/**
 * List of Technologys
 */
exports.list = function(req, res) {
	Technology.find().sort('-created').populate('user', 'displayName').exec(function(err, technologys) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(technologys);
		}
	});
};

/**
 * Techonology middleware
 */
exports.technologyByID = function(req, res, next, id) {
	Technology.findById(id).populate('user', 'displayName').exec(function(err, technology) {
		if (err) return next(err);
		if (!technology) return next(new Error('Failed to load technology ' + id));
		req.technology = technology;
		next();
	});
};

/**
 * Technology authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {

//	Nothing to validate yet
	if (false) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
exports.addQuestion = function(req, res, question,next,idTechnology) {
	Technology.findById(idTechnology).populate('user', 'displayName').exec(function(err, technology) {
		if (err) return next(err);
		if (!technology) return next(new Error('Failed to load technology ' + idTechnology));
		technology.questions.add(question);
		next();
	});
};