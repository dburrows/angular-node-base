var expect = chai.expect;

// testing controller and UserService integration using mocked out $http 

describe('Example Integration Test', function() {

  describe('listController', function() {
    var authRequestHandler;

    beforeEach(function() {
      module('baseApp');
      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        authRequestHandler = $httpBackend.when('GET', '/api/users')
                                        .respond([ { firstName: "Jim", lastName: "Morrison"}]);
      });
    });

    it('should correctly set users in scope', inject(function($controller) {
      var testScope = {};
      var myCtrl = $controller('exampleListController', { $scope: testScope });
      $httpBackend.flush();
      
      expect(testScope.users[0].firstName).to.equal('Jim');
      expect(testScope.users[0].lastName).to.equal('Morrison');      
    }));        
  });

});
