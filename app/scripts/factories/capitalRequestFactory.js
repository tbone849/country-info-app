angular.module('countriesApp').factory('capitalRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/searchJSON?q=capital&maxRows=1&username=tbone849&country=' + country);
        };
    }]);