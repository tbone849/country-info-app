angular.module('countriesApp').controller('country-controller', ['$scope', '$location', 'countriesRequest', function($scope, $location, countriesRequest){
        $scope.setCapitalURL = function(country){
            $location.path('/countries/' + country.countryCode + '/capital');
        };
        $scope.isLoading = true;
        countriesRequest().then(function(response){
            $scope.data = response.data.geonames;
            $scope.isLoading = false;
        });
    }]);