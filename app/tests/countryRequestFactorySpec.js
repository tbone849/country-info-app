describe('countriesRequestFactory', function(){
	beforeEach(module('countriesApp'));

	it('should return countries data from the geonames API', 
		inject(function(countriesRequest, $httpBackend){
			$httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=tbone849')
			.respond(200, { country: "US", capital: "Washington" });

			countriesRequest().then(function(response){
				console.log(response.data.capital);
				expect(response.data.capital).toBe('Washington');
			});

		$httpBackend.flush();
	}));
});