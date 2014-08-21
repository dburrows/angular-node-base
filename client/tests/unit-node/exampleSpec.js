var testHelper = require('./../testHelper');
var Promise = require('bluebird');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var exampleController = require('../../app/js/example/controllers/example-controller');

// example of testing angular controllers without instantiating angular
// tests run super fast, preferred over using angular-mocks if appropriate

describe("Example Unit Test", function() {

  describe("ExampleController", function() {
      var myScope;
      var myUserService;
      var usersReq;

      beforeEach(function() {
        myScope = {};
        myUserService = {};

        // create a resolved promise for myUserService to return
        usersReq = Promise.resolve([{ name: "albert einstein"}]);
        myUserService.all = sinon.stub().returns(usersReq);
      });

      it("should convert a string to upper case", function() {
        // set up the controller
        controller = new exampleController(myScope, myUserService);

        // after controller setup, use the usersReq promise to test state
        // return the promise to automatically run this async in Mocha
        return usersReq.then(function() {
          expect(myScope.upCase('moon')).to.equal("MOON");
        });
      });  

      it("should correctly set users in scope", function() {
        // set up the controller
        controller = new exampleController(myScope, myUserService);

        // after controller setup, use the usersReq promise to test state
        return usersReq.then(function() {
          expect(myScope.users).to.eql([{ name: "albert einstein"}]);
        });
      });     
   
  });
});
