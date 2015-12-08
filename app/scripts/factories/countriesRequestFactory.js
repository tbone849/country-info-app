angular.module('countriesApp').factory('countriesRequest', ['$http', function($http){
        return function(){
            return $http.get('http://api.geonames.org/countryInfoJSON?username=tbone849', {cache:true});
        };
    }]);