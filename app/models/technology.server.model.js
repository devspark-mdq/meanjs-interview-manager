'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Question name',
		trim: true
	},
	technologyId: {
		type: String,
		default: 'DefaultTechId'
	},
	
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Question', QuestionSchema);

/**
 * Technology Schema
 */
var TechnologySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	tags : {
		type: [String],
		default: []
	},
	questions: {
		type: [QuestionSchema],
		default: []
	}
});

mongoose.model('Technology', TechnologySchema);