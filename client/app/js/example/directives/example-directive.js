module.exports = exampleDirective;

/* @ngInject */
function exampleDirective() {
  return {
      restrict: 'AE',
      replace: true,
      template: '<h2>{{ name }}, 1 + 1 = {{1 + 1}}</h2>'
  };
}
