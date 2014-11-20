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
exports.read = function(req, res) {
	res.json(req.technology);
};

/**
 * Update a technology
 */
exports.update = function(req, res) {
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
 * List of Techonologys
 */
exports.list = function(req, res) {
	Techonology.find().sort('-created').populate('user', 'displayName').exec(function(err, technologys) {
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
	Techonology.findById(id).populate('user', 'displayName').exec(function(err, technology) {
		if (err) return next(err);
		if (!technology) return next(new Error('Failed to load technology ' + id));
		req.technology = technology;
		next();
	});
};

/**
 * Techonology authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.technology.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};