describe('country-controller', function(){
	beforeEach(module('countriesApp'));
	var controller, scope, httpBackend;
	beforeEach(inject(function($controller, $rootScope, $httpBackend){
		scope = $rootScope.$new();

		$httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=tbone849')
			.respond({country: 'United States', countryCode: 'US'});

		controller = $controller('country-controller', {
			$scope: scope
		});

		$httpBackend.flush();
	}));


	// still need to fix this
	describe('setCapitalURL', function(){
		it('should change the URL path including the given country code',
			inject(function($location){
				scope.$apply(function(){
					var country = { countryCode: 'US'}
					scope.setCapitalURL(country);
				})
				expect($location.path()).toBe('/countries/US/capital');
			}));
	});
});


