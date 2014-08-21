var chai = require('chai');
var expect = chai.expect;
var request = require('supertest')


describe("Example Server Integration Test", function() {
  describe("server", function() {
    describe("user api", function() {

      it("should return correct user", function(done) {

        request('http://localhost:3000/api/')
          .get('users/1')
          .expect(200)
          .expect({
            "firstName": "Isaac",
            "secondName": "Newton",
            "email": "isaac@example.com"
          }, done);
          
      });     
   
    });
  });
});
