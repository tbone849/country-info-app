angular.module('countriesApp', ['ngRoute'])
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
    }])
    .run(['$rootScope', function($rootScope){
        $rootScope.$on('$routeChangeStart', function(){
            $rootScope.isLoading = true;
            console.log($rootScope.isLoading);
        });
        $rootScope.$on('$routeChangeSuccess', function(){
            $rootScope.isLoading = false;
            console.log($rootScope.isLoading);
        });
    }])
    .factory('countriesRequest', ['$http', function($http){
        return function(){
            return $http.get('http://api.geonames.org/countryInfoJSON?username=tbone849', {cache:true});
        };
    }])
    .factory('countryRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/countryInfoJSON?username=tbone849&country=' + country);
        };
    }])
    .factory('capitalRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/searchJSON?q=capital&maxRows=1&username=tbone849&country=' + country);
        };
    }])
    .factory('neighborsRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/neighboursJSON?username=tbone849&country=' + country);
        };
    }])
    .controller('country-controller', ['$scope', '$location', 'countriesRequest', function($scope, $location, countriesRequest){
        countriesRequest().then(function(response){
            $scope.data = response.data.geonames;
        });

        $scope.setCapitalURL = function(country){
            $location.path('/countries/' + country.countryCode + '/capital');
        };
    }])
    .controller('country-detail-controller', ['$scope', '$http', '$routeParams', 'capitalRequest', 'neighborsRequest', 'countryRequest', function($scope, $http, $routeParams, capitalRequest, neighborsRequest, countryRequest){
        
        var loadingCounter = 0;
        var checkIfLoadingComplete = function(){
            loadingCounter--;
            if(loadingCounter === 0){
                $scope.loadingComplete = true;
            }
        }
        $scope.loadingComplete = false; 
        var country = $routeParams.country;
        capitalRequest(country)
            .then(function(response){
                $scope.capital = response.data.geonames[0];
                checkIfLoadingComplete();
            });
        neighborsRequest(country)
            .then(function(response){
                $scope.neighbors = response.data;
                checkIfLoadingComplete();
            });
        countryRequest(country)
            .then(function(response){
                $scope.country = response.data.geonames[0];
                checkIfLoadingComplete();
            });

        loadingCounter += 3;
    }]);