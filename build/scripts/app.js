angular.module('countriesApp', ['ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'home.html'
        }).when('/countries', {
        	templateUrl : 'countries.html',
        	controller : 'country-controller'
        }).when('/countries/:country/capital', {
        	templateUrl : 'detail.html',
        	controller : 'country-detail-controller'
        }).otherwise('/');
    }]);
    
    
angular.module('countriesApp').controller('country-controller', ['$scope', '$location', 'countriesRequest', function($scope, $location, countriesRequest){
        $scope.setCapitalURL = function(country){
            $location.path('/countries/' + country.countryCode + '/capital');
        };
        $scope.isLoading = true;
        countriesRequest().then(function(response){
            $scope.data = response.data.geonames;
            $scope.isLoading = false;
        }, function(error){
            $scope.countriesRequestError = error.data.status;
            $scope.errors = true;
        });
    }]);
angular.module('countriesApp').controller('country-detail-controller', ['$scope', '$http', '$routeParams', 'capitalRequest', 'neighborsRequest', 'countryRequest', function($scope, $http, $routeParams, capitalRequest, neighborsRequest, countryRequest){
        
        var loadingCounter = 0;
        var checkIfLoadingComplete = function(){
            loadingCounter--;
            if(loadingCounter === 0){
                $scope.loadingComplete = true;
            }
        };
        $scope.loadingComplete = false;
        $scope.errors = false; 
        var country = $routeParams.country;
        capitalRequest(country)
            .then(function(response){
                $scope.capital = response.data.geonames[0];
                checkIfLoadingComplete();
            }, function(error){
                $scope.capitalError = error.data.status;
                $scope.errors = true;
            });
        neighborsRequest(country)
            .then(function(response){
                $scope.neighbors = response.data;
                console.log($scope.neighbors.geonames[0]);
                checkIfLoadingComplete();
            }, function(error){
                $scope.neighborsError = error.data.status;
                $scope.errors = true;
            });
        countryRequest(country)
            .then(function(response){
                $scope.country = response.data.geonames[0];
                checkIfLoadingComplete();
            }, function(error){
                $scope.countryError = error.data.status;
                $scope.errors = true;
            });

        loadingCounter += 3;
    }]);
angular.module('countriesApp').factory('capitalRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/searchJSON?q=capital&maxRows=1&username=tbone849&country=' + country);
        };
    }]);
angular.module('countriesApp').factory('countriesRequest', ['$http', function($http){
        return function(){
            return $http.get('http://api.geonames.org/countryInfoJSON?username=tbone849', {cache:true});
        };
    }]);
angular.module('countriesApp').factory('countryRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/countryInfoJSON?username=tbone849&country=' + country);
        };
    }]);
angular.module('countriesApp').factory('neighborsRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/neighboursJSON?username=tbone849&country=' + country);
        };
    }]);