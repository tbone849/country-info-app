angular.module('countriesApp').factory('countryRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/countryInfoJSON?username=tbone849&country=' + country);
        };
    }]);