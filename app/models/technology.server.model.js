'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */

var QuestionSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	}
});

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