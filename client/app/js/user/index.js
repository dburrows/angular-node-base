
var UserService = require('./services/user');

module.exports = angular.module('baseApp.user',[])
  .factory('UserService', UserService);

