'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Authentication, Questions) {

		$scope.question = {answers: []};

		$scope.authentication = Authentication;
		// Create new Question
		$scope.create = function() {			
			// Create new Question object

			var question = new Questions ({
				name: $scope.question.name,
				technologyId: $stateParams.technologyId,
				type: $scope.question.type,
				difficulty: $scope.question.difficulty,
				keywords: $scope.question.keywords,
				answers:  $scope.question.answers
			});
			// Redirect after save

			question.$save(function(response) {
				$location.path('/technologies/' + $stateParams.technologyId);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Question
		$scope.remove = function(question) {
			if ( $scope.question ) { 
				$scope.question.$remove();

				for (var i in $scope.questions) {
					if ($scope.questions [i] === question) {
						$scope.questions.splice(i, 1);
					}
				}
			} else {
				$scope.question.$remove({technologyId:$stateParams.technologyId},function() {
					$location.path('/technologies/' + $stateParams.technologyId);
				});
			}
		};

		// Update existing Question
		$scope.update = function() {
			var tagsAux = [];
		if($scope.question.type==='keyword'){
			angular.forEach($scope.question.keywords, function(elem){

				tagsAux.push(elem.text);
			});
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
				$location.path('/technologies/' + $stateParams.technologyId + '/questions/' + question._id);
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
	}
]);