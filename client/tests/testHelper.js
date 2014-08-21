var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;

module.exports =  {
  siteUnderTestURL: "http://localhost:3000/",
  defer: function() {
    var resolve, reject;
    var promise = new Promise(function() {
        resolve = arguments[0];
        reject = arguments[1];
    });
    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    };
  }

};
