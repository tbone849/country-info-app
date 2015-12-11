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