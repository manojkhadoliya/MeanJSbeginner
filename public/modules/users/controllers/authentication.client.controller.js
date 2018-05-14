'use strict';
angular.module('users').directive('validPasswordC', function() {
	return {
		require: 'ngModel',
		scope: {
			reference : 'validPasswordC'
		},
		controller: 'AuthenticationController',

		link: function(scope, elm, attrs, ctrl) {
			
			ctrl.$parsers.unshift(function(viewValue, $scope) {

				var noMatch = viewValue !== scope.reference;
				console.log('viewValue',viewValue);
				console.log('scope.reference',scope.reference);
				ctrl.$setValidity('noMatch', !noMatch);
				scope.passMatch = !noMatch;
				return (noMatch) ? noMatch : !noMatch;
			});

			scope.$watch('reference', function(value) {
				ctrl.$setValidity('noMatch', value === ctrl.$viewValue);
			});
		}
	};
});
angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			console.log('**********',$scope.passMatch);

			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);