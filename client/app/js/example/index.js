
var exampleController = require('./controllers/example-controller');
var exampleDirective = require('./directives/example-directive');

module.exports = angular.module('baseApp.example',[])
  .controller('exampleController', exampleController)
  .directive('exampleDirective', exampleDirective);

