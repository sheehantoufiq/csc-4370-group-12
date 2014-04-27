var app = angular.module('shelfspaceApp', [
  'ngRoute',
  'ngCookies',
  'ui.router',
  'shelfspaceApp.filters',
  'shelfspaceApp.services',
  'shelfspaceApp.directives',
  'shelfspaceApp.controllers'
])

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/login',             {templateUrl: 'partials/login-view.html', controller: 'LoginController'})
    .when('/register',          {templateUrl: 'partials/register-view.html', controller: 'RegisterController'})
    .when('/forgot-password',   {templateUrl: 'partials/forgot-password-view.html', controller: 'PassresetController'})
    .when('/home',              {templateUrl: 'partials/feed-view.html', controller: 'FeedController'})
    .when('/admin',             {templateUrl: 'partials/admin-view.html', controller: 'FeedController'})
    .when('/group-info',        {templateUrl: 'partials/group-info-view.html', controller: 'FeedController'})
    .when('/add',               {templateUrl: 'partials/add-view.html', controller: 'FeedController'})
    .when('/search',            {templateUrl: 'partials/search-view.html', controller: 'FeedController'})
    .when('/settings',          {templateUrl: 'partials/settings-view.html', controller: 'FeedController'})
    .when('/item/:item_id',     {templateUrl: 'partials/item-view.html', controller: 'FeedController'})
    .otherwise({redirectTo: '/login'});

  // Removes the # in urls
  // $locationProvider.html5Mode(true);    

}]);
/*
app.run(['$scope', '$location', '$cookieStore', function($scope, $location, $cookieStore) {

  $scope.loggedIn = $cookieStore.get('loggedin');

  if($scope.loggedIn == "true") {
    $location.path('#/login');      
  } else {
    //$location.path('/publicurl'); 
  }

}]);*/

app.factory('UserService', [function() {
  
  var isLogged = 'false';
  var userInfo = '';

  return { 
    getStatus: function() {
      return isLogged;
    },
    setStatus: function(value) {
      isLogged = value;
    },
    getUser: function() {
      return userInfo;
    },
    setUser: function(value) {
      userInfo = value;
    }
  }
}]);

app.factory('SaveUser', ['$http', function($http) {

  var returnUserID = '';

  return {
    setUser: function(value) { 
      $http({
        url: 'api/v2/set_user',
        method: "POST",
        data: JSON.stringify({
          email: value
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        console.log(data);
      }).error(function (data, status, headers, config) {
        console.log(data);
      });
    },
    getUser: function() {
      $http({
        url: 'api/v2/get_user',
        method: "GET",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        returnUserID = data;
      }).error(function (data, status, headers, config) {
        console.log(data);
      });
      return returnUserID;
    }
  }
}]);