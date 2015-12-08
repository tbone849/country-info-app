angular.module('countriesApp').factory('neighborsRequest', ['$http', function($http){
        return function(country){
            return $http.get('http://api.geonames.org/neighboursJSON?username=tbone849&country=' + country);
        };
    }]);