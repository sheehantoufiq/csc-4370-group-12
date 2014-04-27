'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('shelfspaceApp.services', [])

app.value('version', '0.1');

app.factory('RoleService', function ($http) {

  'use strict';

  var adminRoles = ['admin', 'editor'];
  var otherRoles = ['user'];

  return {
    validateRoleAdmin: function (currentUser) {
      return currentUser ? _.contains(adminRoles, currentUser.role) : false;
    },

    validateRoleOther: function (currentUser) {
      return currentUser ? _.contains(otherRoles, currentUser.role) : false;
    }
  };
});

app.factory('AuthenticationService', function ($http, SessionService) {

  'use strict';

  return {

    login: function (user) {
      // this method could be used to call the API and set the user instead of taking it in the function params
      SessionService.currentUser = user;
    },

    isLoggedIn: function () {
      return SessionService.currentUser !== null;
    }
  };
});

app.factory('SessionService', function () {

  'use strict';

  return {
    currentUser: null
  };
});
