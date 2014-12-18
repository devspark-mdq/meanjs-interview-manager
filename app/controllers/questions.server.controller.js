'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	technologies = require('./technologies.server.controller'),
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
exports.update = function(req, res, next) {

	var question = req.question;

	question = _.extend(question , req.body);

	technologies.editQuestion(req, res, question, req.technology._id, next);
};

/**
 * Delete an Question
 */
exports.delete = function(req, res) {
	var question = req.question ;

	technologies.removeQuestion(req,res,question,req.technology._id);
};

/**
 * List of Questions
 */
exports.list = function(req, res) { 

	res.jsonp(req.technology.questions);
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

