module.exports = exampleController;

/* @ngInject */
function exampleController($scope, UserService) {

  UserService.all()
  .then(function(users){
    $scope.users = users;
  });

  $scope.name = "Bruce Banner";

  $scope.upCase = function(str) {
    return str.toUpperCase(str);
  };

}

