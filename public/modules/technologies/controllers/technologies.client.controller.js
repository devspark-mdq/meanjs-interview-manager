'use strict';

angular.module('technologies').controller('TechnologiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Technologies',
	function($scope, $stateParams, $location, Authentication, Technologies) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var technology = new Technologies({
				title: this.title,
				content: this.content
			});
			technology.$save(function(response) {
				$location.path('technologies/' + response._id);

				$scope.title = '';
				$scope.content = '';
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

		$scope.findOne = function() {
			$scope.technology = Technologies.get({
				technologyId: $stateParams.technologyId
			});
		};
	}
]);