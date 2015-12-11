describe('country-controller', function(){
	var $controller;
	var countriesRequestSpy;
	var countriesThenSpy;
	
	beforeEach(module('countriesApp', function($provide){
		countriesThenSpy = jasmine.createSpy();
		countriesRequestSpy = jasmine.createSpy().and.callFake(function(){
			return {
				then: countriesThenSpy
			}
		});

		$provide.value('countriesRequest', countriesRequestSpy);
		
	}));
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_; 
	}));

	
	it('should change the URL path including the given country code',
		inject(function($location, $rootScope){
			var scope = {};
			controller = $controller('country-controller', { 
				$scope: scope 
			});
			$rootScope.$apply(function(){
				var country = { countryCode: 'US'};
				scope.setCapitalURL(country);
			});

			expect($location.path()).toBe('/countries/US/capital');
		}));
	
	it('should set countries on countriesRequest success', function(){
		var scope = {};
		controller = $controller('country-controller', { 
			$scope: scope 
		});

		expect(countriesRequestSpy).toHaveBeenCalled();

		var successHandler = countriesThenSpy.calls.argsFor(0)[0];

		successHandler({data: {geonames: "Countries Data"}});

		expect(scope.data).toBe('Countries Data');
		expect(scope.isLoading).toBe(false);
	});

	it('should set errors on countriesRequest error', function(){
		var scope = {};
		controller = $controller('country-controller', { 
			$scope: scope 
		});

		expect(countriesRequestSpy).toHaveBeenCalled();

		var errorHandler = countriesThenSpy.calls.argsFor(0)[1];
		errorHandler({ data: {status: 'test status'}});

		expect(scope.countriesRequestError).toBe('test status');
		expect(scope.errors).toBe(true);
	})
});


