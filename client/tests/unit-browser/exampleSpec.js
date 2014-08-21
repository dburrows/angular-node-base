describe('Example Unit Test', function() {

  describe('exampleController', function() {
    var myUserService;
    var testScope;
    var usersReq;

    beforeEach(function() {
      module('baseApp');
      myUserService = {};
      testScope = {};
      usersReq = Promise.resolve([{ name: "albert einstein"}]);
      myUserService.all = sinon.stub().returns(usersReq);
    });

    it('should convert a string to upper case', function() {
      inject(function($controller)  {
        var myCtrl = $controller('exampleController', { $scope: testScope });
      });
      expect(testScope.upCase('moon')).to.equal('MOON');
    });  

    it('should correctly set users in scope', function(){
      inject(function($controller)  {
        var myCtrl = $controller('exampleController', 
          { $scope: testScope, 'UserService': myUserService }
        );
      });
      return usersReq.then(function() {
        expect(testScope.users).to.eql([{ name: "albert einstein"}]);
      });  
    });        
  });

});
