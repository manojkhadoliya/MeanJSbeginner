'use strict';

angular.module('categories').controller('CategoriesController', ['$scope', '$location', 'Categories',

	function($scope, $location, Categories) {
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
	}
]);