describe('countryRequest', function(){
	beforeEach(module('countriesApp'));

	it('should return country data from the geonames API', 
		inject(function(countryRequest, $httpBackend, $rootScope){
			var country = 'US';
			$httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=tbone849&country=' + country)
				.respond(200);

			var status = false;
        	countryRequest(country).success(function() {
        	    status = true;
        	});
        	$rootScope.$digest();
        	$httpBackend.flush();
        	expect(status).toBe(true);
        	$httpBackend.verifyNoOutstandingRequest();
	}));
});