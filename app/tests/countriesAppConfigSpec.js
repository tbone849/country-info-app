describe('countriesApp', function(){
	beforeEach(module('countriesApp'));

	describe('/ route', function(){
		it('should load the home.html template',
			inject(function($location, $rootScope, $httpBackend, $route){
				$httpBackend.expect('GET', 'home.html').respond(200);
				$rootScope.$apply(function(){
					$location.path('/');
				});
				expect($route.current.loadedTemplateUrl).toBe('home.html');
				afterEach(function () {
 				  $httpBackend.flush()
 				  $httpBackend.verifyNoOutstandingExpectation();
 				  $httpBackend.verifyNoOutstandingRequest();
 				});
			}));
	});

	describe('/countries route', function(){
		it('should load the countries.html template and load the country-controller',
			inject(function($location, $rootScope, $httpBackend, $route){
				$httpBackend.expect('GET', 'countries.html').respond(200);
				$rootScope.$apply(function(){
					$location.path('/countries');
				});
				expect($route.current.controller).toBe("country-controller");
				expect($route.current.loadedTemplateUrl).toBe('countries.html');
				afterEach(function () {
 				  $httpBackend.flush()
 				  $httpBackend.verifyNoOutstandingExpectation();
 				  $httpBackend.verifyNoOutstandingRequest();
 				});
			}));
	});

	// this fails for some reason
	describe('/countries/:country/capital route', function(){
		it('should load the detail.html template and load the country-detail-controller',
			inject(function($location, $rootScope, $httpBackend, $route){
				$httpBackend.expect('GET', 'detail.html').respond(200);
				$rootScope.$apply(function(){
					$location.path('/countries/US/capital');
				});
				expect($route.current.controller).toBe("country-detail-controller");
				expect($route.current.loadedTemplateUrl).toBe('detail.html');
				afterEach(function () {
 				  $httpBackend.flush()
 				  $httpBackend.verifyNoOutstandingExpectation();
 				  $httpBackend.verifyNoOutstandingRequest();
 				});
			}));
	});
});