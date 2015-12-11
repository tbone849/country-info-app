describe('capitalRequest', function(){
	beforeEach(module('countriesApp'));

	it("should return a country's capital data from the geonames API", 
		inject(function(capitalRequest, $rootScope, $httpBackend){
			var country = 'US';
			$httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?q=capital&maxRows=1&username=tbone849&country=' + country)
			.respond(200);

			var status = false;
        	capitalRequest(country).success(function() {
        	    status = true;
        	});
        	$rootScope.$digest();
        	$httpBackend.flush();
        	expect(status).toBe(true);
        	$httpBackend.verifyNoOutstandingRequest();
	}));
});