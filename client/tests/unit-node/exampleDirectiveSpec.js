var testHelpers = require('./../testHelper');
var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;
var angular = require('angular');

var exampleDirective = require('../../app/js/example/directives/example-directive');

describe('exampleDirective', function() {
  it('should work', function() {

    angular.module('testApp', [])
      .directive('exampleDirective', exampleDirective);
    var inject = angular.injector(['ng','testApp']).invoke;

    inject(function($rootScope, $compile) {
      $rootScope.name = "Bruce Banner";
      el = $compile('<div example-directive></div>')($rootScope);
      $rootScope.$digest();
      expect(el.text()).to.equal('Bruce Banner, 1 + 1 = 2');
    });
  });     
});
