'use strict';

angular.module('technologies').controller('TechnologiesController', ['Questions','$scope', '$stateParams', '$location', 'Authentication', 'Technologies',
	function(Questions, $scope, $stateParams, $location, Authentication, Technologies) {
		$scope.authentication = Authentication;
		$scope.questions = [];
		//$scope.tags = [];

		if($stateParams.technologyId){
			$scope.technology = Technologies.get({
				technologyId: $stateParams.technologyId
			});
		}else{
			$scope.technology = new Technologies();
		}

		$scope.create = function() {

			var tagsAux = new Array();

			angular.forEach($scope.technology.tags, function(elem){

				tagsAux.push(elem.text) ;
			});
			$scope.technology.tags = tagsAux;
			
			$scope.technology.$save(function(response) {
				$location.path('technologies/' + response._id);

				$scope.name = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(technology) {
			if (technology) {
				technology.$remove();

				for (var i in $scope.technologies) {
					if ($scope.technologies[i] === technology) {
						$scope.technologies.splice(i, 1);
					}
				}
			} else {
				$scope.technology.$remove(function() {
					$location.path('technologies');
				});
			}
		};

		$scope.update = function() {

			var tagsAux = new Array();

			angular.forEach($scope.technology.tags, function(elem){

				tagsAux.push(elem.text) ;
			});
			
			$scope.technology.tags = tagsAux;

			var technology = $scope.technology;

			technology.$update(function() {
				$location.path('technologies/' + technology._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.technologies = Technologies.query();
		};


		$scope.findQuestions = function() {
			$scope.questions = Questions.query({
				technologyId: $stateParams.technologyId
				});
		};

		$scope.addQuestion = function(){
			$scope.questions.push({});
		};

		$scope.removeQuestion = function(question){
      var index = $scope.questions.indexOf(question);
			$scope.questions.splice(index, 1);
		};
	}
]);