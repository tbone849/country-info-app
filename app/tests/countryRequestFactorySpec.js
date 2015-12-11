describe('countriesRequest', function(){
	beforeEach(module('countriesApp'));

	it('should return countries data from the geonames API', 
		inject(function(countriesRequest, $httpBackend, $rootScope){
			$httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=tbone849')
				.respond(200);

			var status = false;
        	countriesRequest().success(function() {
        	    status = true;
        	});
        	$rootScope.$digest();
        	$httpBackend.flush();
        	expect(status).toBe(true);
        	$httpBackend.verifyNoOutstandingRequest();
	}));
});