'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Question = mongoose.model('Question'),
	Technology = mongoose.model('Technology'),
	_ = require('lodash');

/**
 * Create a Question
 */
exports.create = function(req, res) {

	var question = new Question(req.body);
	question.user = req.user;

	Technology.findById(req.body.technologyId, function (err, doc){
  		
  		if (!err){

  			question._id = mongoose.Types.ObjectId();
  			doc.questions.push(question);
		
			doc.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(question);
				}
			});
  		}
  		
  		else{

			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
  		}
	});

};

/**
 * Show the current Question
 */
exports.read = function(req, res) {

	res.jsonp(req.question);
};

/**
 * Update a Question
 */
exports.update = function(req, res) {
	var question = req.question ;

	question = _.extend(question , req.body);

	question.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

/**
 * Delete an Question
 */
exports.delete = function(req, res) {
	var question = req.question ;

	question.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

/**
 * List of Questions
 */
exports.list = function(req, res) { 
	Question.find().sort('-created').populate('user', 'displayName').exec(function(err, questions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(questions);
		}
	});
};

/**
 * Question middleware
 */
exports.questionByID = function(req, res, next, id) { 

	var question = req.technology.questions.id(id);

	if (! question) return next(new Error('Failed to load question ' + id));
		
	req.question = question;
	next();
};

/**
 * Question authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (false) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
