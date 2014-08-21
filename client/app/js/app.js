
require('../.tmp/templates.js');

var example = require('./example');
var user = require('./user');

var baseApp = angular.module('baseApp', [
  'templates-main',
  example.name,
  user.name
]);

console.log('app loaded');

module.exports = baseApp;
