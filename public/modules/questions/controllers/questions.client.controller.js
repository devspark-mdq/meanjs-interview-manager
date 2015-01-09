'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Authentication, Questions) {

		$scope.question = {answers: []};

		$scope.authentication = Authentication;

		// Remove existing Question
		$scope.remove = function(question) {
				$scope.question.$remove({technologyId:$stateParams.technologyId},function() {
					$location.path('/technologies/' + $stateParams.technologyId);
				});
		};

		// Create new Question
		$scope.create = function() {			
			var tagsAux = [];
			if($scope.question.type==='keyword'){
				if  ($scope.question.keywords.length===0 ){
					alert('You must insert at least 1 keyword');
					return;
				}
				else{

					angular.forEach($scope.question.keywords, function(elem){
						console.log(elem.text);
						tagsAux.push(elem.text);
					});
				}
			}
			else if($scope.question.type === 'single' || $scope.question.type==='multiple' ){
				if ( !$scope.validateRadios() ){
					alert('You must mark one answer as true');
					return;
				}
			}
			// Create new Question object
			var question = new Questions ({
				name: $scope.question.name,
				technologyId: $stateParams.technologyId,
				type: $scope.question.type,
				difficulty: $scope.question.difficulty,
				keywords: tagsAux,
				answers:  $scope.question.answers
			});
			// Redirect after save

			question.$save(function(response) {
				$location.path('/technologies/' + $stateParams.technologyId);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Update existing Question
		$scope.update = function() {
			var tagsAux = [];
			if($scope.question.type==='keyword'){
				console.log('keyword');
				if  ($scope.question.keywords.length===0 ){
					alert('You must insert at least 1 keyword');
					return;
				}
				else{
					angular.forEach($scope.question.keywords, function(elem){
						tagsAux.push(elem.text);
					});
				}
			}
			else if($scope.question.type === 'single' || $scope.question.type==='multiple' ){
				console.log('single');
				if ( !$scope.validateRadios() ){
					alert('You must mark one answer as true');
					return;
				}
			}

			var question = new Questions ({
				_id: $stateParams.questionId,
				name: $scope.question.name,
				technologyId: $stateParams.technologyId,
				type: $scope.question.type,
				difficulty: $scope.question.difficulty,
				keywords: tagsAux,
				answers: $scope.question.answers
			});	
				
			question.$update({technologyId:$stateParams.technologyId}, function() {
				$location.path('/technologies/' + $stateParams.technologyId);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Questions
		$scope.find = function() {
			$scope.questions = Questions.query();
		};

		// Find existing Question
		$scope.findOne = function() {
			$scope.question = Questions.get({
				technologyId: $stateParams.technologyId,
				questionId: $stateParams.questionId
			});
			$scope.technology= $stateParams.technologyId;
		};

		$scope.addAnswer = function(){
				$scope.question.answers.push({});
		};

		$scope.removeAnswer = function(answer){
	        var index = $scope.question.answers.indexOf(answer);
			$scope.question.answers.splice(index, 1);
		};
		$scope.clickRadio=function(answer){
				angular.forEach($scope.question.answers, function(elem){
					elem.isItRight=false;
				});
				answer.isItRight=true;
		};

		$scope.validateRadios = function() {
			var flag = false;
			angular.forEach($scope.question.answers, function(elem){
				if(elem.isItRight) flag = true;
			});			
			return flag;
		};
	}
]);