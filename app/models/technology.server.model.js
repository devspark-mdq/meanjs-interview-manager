'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Answer Schema
 */

var AnswerSchema = new Schema({

	text: {
	
		type: String,
		default: '',
		required: 'Please fill the possible answer',
		trim: true
	},

	created: {
	
		type: Date,
		default: Date.now
	},

	isItRight: {

		type: Boolean,
		default: false
	}
});
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

	created: {
	
		type: Date,
		default: Date.now
	},

	type: {

		type: String,
		enum: ['single', 'multiple', 'keyword'],
		default: 'single'
	},

	difficulty: {

		type: String,
		enum: ['basic', 'intermediate', 'high'],
		default: 'intermediate'
	},

	score: {

		type: Number, 
		min: 1, 
		max: 10
	},

	keywords: {	//	only used if question type is keyword

		type: [String],
		default: []
	}, 

	questions: {
		type: [AnswerSchema],
		default: []
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