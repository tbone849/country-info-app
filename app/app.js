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
    .factory('countriesRequest', ['$http', function($http){
        return function(){
            return $http.get('http://api.geonames.org/countryInfoJSON?username=tbone849');
        };
    }])
    .controller('country-controller', ['$scope', 'countriesRequest', function($scope, countriesRequest){
        countriesRequest().then(function(response){
            $scope.data = response.data;
            console.log($scope.data);
        });
    }])
    .controller('country-detail-controller', ['$scope', function($scope){

    }]);