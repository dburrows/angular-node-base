var testHelper = require('./../testHelper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('E2E Test: ', function() {
  describe("app", function() {
    describe("homepage", function() {
      before(function() {
        browser.driver.get(testHelper.siteUnderTestURL);
      });

      it('should exist', function() {
        expect(browser.getTitle()).to.eventually.equal('Test App');
      });

      it('should list two users', function() {
        var userTableLength = element
          .all(by.repeater('user in users'));

        expect(userTableLength.count()).to.eventually.equal(2);
      });

      it('should contain correct content', function() {
        // find by css        
        var firstItemHeading = element(
          by.repeater('user in users').row(0)
        ).element(
          by.css('.media-heading'
        ));
        // find by binding string
        var secondItemHeading = element(
          by.repeater('user in users').row(1).column('user.name')
        );

        expect(firstItemHeading.getText()).to.eventually.equal('Isaac Newton');
        expect(secondItemHeading.getText()).to.eventually.equal('Albert Einstein');
      });

     /**
      * Debugging example - will keep the test browser open for inspection
      * Only works when running cli with debug option e.g. 
      *    protractor debug client/tests/protractorConf.js
      * then hit c & return to continue, execution will stop at debugger statement 
      */
      
      // it('problematic test', function(done) {
      //   browser.debugger();
      // });

    });
  });
});
