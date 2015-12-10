describe('country-detail-controller', function(){
	var capitalRequestSpy;
	var neighborsRequestSpy;
	var countryRequestSpy;
	var capitalThenSpy;
	var neighborsThenSpy;
	var countryThenSpy;
	var testParams = {
		country: 'USA'
	};

	beforeEach(module('countriesApp', function($provide){
		capitalThenSpy = jasmine.createSpy();
		capitalRequestSpy = jasmine.createSpy().and.callFake(function(){
			return {
				then: capitalThenSpy
			}
		});
		neighborsThenSpy = jasmine.createSpy();
		neighborsRequestSpy = jasmine.createSpy().and.callFake(function(){
			return {
				then: neighborsThenSpy
			}
		});
		countryThenSpy = jasmine.createSpy();
		countryRequestSpy = jasmine.createSpy().and.callFake(function(){
			return {
				then: countryThenSpy
			}
		});
		
		$provide.value('capitalRequest', capitalRequestSpy);
		$provide.value('$routeParams', testParams);
		$provide.value('neighborsRequest', neighborsRequestSpy);
		$provide.value('countryRequest', countryRequestSpy);
	}));

	var $controller;
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	it('should set capital on capitalRequest success', function(){
		var scope = {};
		controller = $controller('country-detail-controller', {
			$scope: scope
		});

		expect(capitalRequestSpy).toHaveBeenCalled();
		expect(capitalRequestSpy).toHaveBeenCalledWith(testParams.country);

		var successHandler = capitalThenSpy.calls.argsFor(0)[0];

		successHandler({ data: {geonames: ['Washington']}});

		expect(scope.capital).toBe('Washington');
	});

	it('should set errors on capitalRequest error', function(){
		var scope = {};
		controller = $controller('country-detail-controller', {
			$scope: scope
		});

		expect(capitalRequestSpy).toHaveBeenCalled();
		expect(capitalRequestSpy).toHaveBeenCalledWith(testParams.country);

		var errorHandler = capitalThenSpy.calls.argsFor(0)[1];

		errorHandler({ data: { status: 'test status'}});

		expect(scope.capitalError).toBe('test status');
		expect(scope.errors).toBe(true);
	});

	it('should set neighbors on neighborRequest success', function(){
		var scope = {};
		controller = $controller('country-detail-controller', {
			$scope: scope
		});

		expect(capitalRequestSpy).toHaveBeenCalled();
		expect(capitalRequestSpy).toHaveBeenCalledWith(testParams.country);

		var successHandler = neighborsThenSpy.calls.argsFor(0)[0];

		successHandler({ data: 
							{
								geonames: [{countryName: 'Canada'}, {countryName: 'Mexico'}]
							}
						});

		expect(scope.neighbors.geonames[0].countryName).toBe('Canada');
		expect(scope.neighbors.geonames[1].countryName).toBe('Mexico');
	});

	it('should set errors on neighborsRequest error', function(){
		var scope = {};
		controller = $controller('country-detail-controller', {
			$scope: scope
		});

		expect(neighborsRequestSpy).toHaveBeenCalled();
		expect(neighborsRequestSpy).toHaveBeenCalledWith(testParams.country);

		var errorHandler = neighborsThenSpy.calls.argsFor(0)[1];

		errorHandler({ data: { status: 'test status'}});

		expect(scope.neighborsError).toBe('test status');
		expect(scope.errors).toBe(true);
	});

	it('should set country on countryRequest success', function(){
		var scope = {};
		controller = $controller('country-detail-controller', {
			$scope: scope
		});

		expect(countryRequestSpy).toHaveBeenCalled();
		expect(countryRequestSpy).toHaveBeenCalledWith(testParams.country);

		var successHandler = countryThenSpy.calls.argsFor(0)[0];

		successHandler({ data: {geonames: ['Mexico']}});

		expect(scope.country).toBe('Mexico');
	});

	it('should set errors on capitalRequest error', function(){
		var scope = {};
		controller = $controller('country-detail-controller', {
			$scope: scope
		});

		expect(countryRequestSpy).toHaveBeenCalled();
		expect(countryRequestSpy).toHaveBeenCalledWith(testParams.country);

		var errorHandler = countryThenSpy.calls.argsFor(0)[1];

		errorHandler({ data: { status: 'test status'}});

		expect(scope.countryError).toBe('test status');
		expect(scope.errors).toBe(true);
	});
});