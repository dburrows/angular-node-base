User = require('../../../../../core/models/user.js');
module.exports = UserService;

/* @ngInject */
function UserService($q, $http){
  var service = {
    all: function() {
      var d = $q.defer();
      $http.get('/api/users')
      .success(function(data, status) {
        d.resolve(data.map(function(user) {
          return new User(user);
        }));
      }).error(function(data, status) {
        d.reject(data);
      });
      return d.promise;
    }
  };
  return service;
}
