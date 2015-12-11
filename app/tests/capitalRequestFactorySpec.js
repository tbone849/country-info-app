describe('countriesRequestFactory', function(){
	beforeEach(module('countriesApp'));

	it("should return a country's capital data from the geonames API", 
		inject(function(capitalRequest, $httpBackend){
			var country = 'US';
			$httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?q=capital&maxRows=1&username=tbone849&country=' + country)
			.respond(200, { country: "US", capital: "Warshington" });

			countriesRequest().then(function(response){
				expect(response.data.capital).toBe('Washington');
			});

		$httpBackend.flush();
	}));
});