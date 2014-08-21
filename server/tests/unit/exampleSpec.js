var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var getUsers = require('../../app/routes/users/getUsers');
var getUser = require('../../app/routes/users/getUser');

describe("Example Server Unit Test", function() {
  describe("user routes", function() {

      it("should return a user", function() {
        var res,req, spy;
        res = req = {};

        spy = res.send = sinon.spy();
        getUsers(req, res);
        expect(spy.calledOnce).to.equal(true);

      });     

  });
});
