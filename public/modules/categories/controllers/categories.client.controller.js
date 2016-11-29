'use strict';

angular.module('categories').controller('CategoriesController', ['$scope', '$stateParams', '$location', 'Categories',

	function($scope, $stateParams, $location, Categories) {
		//create a category
		$scope.create = function() {
			var category = new Categories({
				name: this.name,
				description: this.description
			});
			category.$save(function(response) {
				$location.path('categories/' + response._id);
				$scope.name = '';
			}, function(errResponse) {
				$scope.error = errResponse.data.message;
			});


		};
		$scope.find = function() {
			$scope.categories = Categories.query();
		};
		$scope.findOne = function() {
			$scope.category = Categories.get({
				categoryId: $stateParams.categoryId
			});
		};
		$scope.update = function() {
			var category = $scope.category;
			category.$update(function() {
				$location.path('categories/' + category._id);
			}, function(errResponse) {
				$scope.error = errResponse.data.message;
			});
		};
		$scope.remove = function(category) {
			if (category) {
				category.$remove();
				for (var i in $scope.categories) {
					if ($scope.categories[i] == category) {
						$scope.categories.splice(i, 1);
					}
				}
			} else {
				$scope.category.$remove(function() {
					$location.path('categories');
				});
			}
		};
	}
]);