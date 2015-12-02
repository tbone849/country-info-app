angular.module('countriesApp', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'home.html'
        }).when('/countries', {
        	templateUrl : 'countries.html',
        	controller : 'country-controller'
        }).when('/countries/:country/capitol', {
        	templateUrl : 'detail.html',
        	controller : 'country-detail-controller'
        }).otherwise('/');
    }])
    .controller('country-controller', ['$scope', function($scope){

    }])
    .controller('country-detail-controller', ['$scope', function($scope){

    }]);