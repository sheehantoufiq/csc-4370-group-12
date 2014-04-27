'use strict';

/* Controllers */

var app = angular.module('shelfspaceApp.controllers', [])

app.controller('HeaderController', ['$scope', '$cookieStore', '$location', function($scope, $cookieStore, $location) {

  $scope.loggedIn = $cookieStore.get('loggedin');
  if ($scope.loggedIn == "true") {
    $scope.loggedOut = "";
  } else {
    $scope.loggedOut = "true";
    $location.path('#/login'); 
  }
}]);

app.controller('LogheadController', ['$scope', '$cookieStore', '$location', function($scope, $cookieStore, $location) {

  $scope.loggedIn = $cookieStore.get('loggedin');
  if ($scope.loggedIn == "true") {
    $scope.loggedOut = "";
    $location.path('#/home');
  } else {
    $scope.loggedOut = "true";
  }

}]);

app.controller('LoginController', ['$scope', '$http', '$location', '$cookieStore', 'UserService', 'SaveUser', function($scope, $http, $location, $cookieStore, UserService, SaveUser) {

  var User = UserService;
  var Set = SaveUser

  $scope.email = "";
  $scope.password = "";
  $scope.msg = "";


  $scope.login = function(){
      $scope.msg = "";

      var config = {
          url: 'api/v2/login',
          method: 'POST',
          data: JSON.stringify({
            email: $scope.email,
            password: $scope.password
          }),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }

      console.log('User: ' + $scope.email + $scope.password);

      
      $http(config)
      .success(function(data,status,headers,config){
          if(data.msg != 'Wrong Credentials'){
              //successfull login
              var userInfo = data.user_info[0];
              //var userItems = data.user_items;
              $cookieStore.put('loggedin', 'true');
              User.setStatus('true');
              User.setUser(userInfo);
              Set.setUser(data.user_info[0].email);
              $location.path('/home');
          }
          else{
              $cookieStore.put('loggedin', '');
              User.setStatus('false');
              User.setUser('');
              $scope.msg = "Login Information Incorrect.";
          }
      })
      .error(function(data,status,headers,config){
          $cookieStore.put('loggedin', '');
          User.setStatus('false');
          User.setUser('');
      }) 
  }

  $scope.logout = function() {
    $cookieStore.put('loggedin', '');
    User.setStatus('false');
    User.setUser('');
    $location.path('/login');
  }
}]);
  
app.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.email = "";
  $scope.password = "";
  $scope.msg = "";

  $scope.register = function(){
      $scope.msg = "";

      var config = {
          url: 'api/v2/add_user',
          method: 'POST',
          data: JSON.stringify({
            email: $scope.email,
            password: $scope.password
          }),
          headers: {'Content-Type': 'application/json; charset=utf-8'}
      }

      $http(config)
      .success(function(data,status,headers,config){
          if(data.msg != 'Failure to create user'){
              $location.path('/login');
          }
          else{
              $scope.msg = "Email already exists.";          
          }
      })
      .error(function(data,status,headers,config){

      })
    }
}]);

app.controller('AdminController', '', ['$scope', function($scope, $http) {
}]);

app.controller('PassresetController', ['$scope', function($scope) {
}]);

app.controller('FeedController', ['$scope', '$routeParams', '$http', 'UserService', 'SaveUser', function($scope, $http, $routeParams, UserService, SaveUser) {

  var User = UserService;
  var Get = SaveUser;

  $scope.inventory2 = [];
  $scope.userId = Get.getUser();

  $scope.getItems = function(){
    var config = {
        url: 'api/v2/items/' + $scope.userID,
        method: 'GET',
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    }

    $http(config)
    .success(function(data,status,headers,config){
    })
    .error(function(data,status,headers,config){
    })
  }

  $scope.inventory = {
    "items": [
      {
        "item_id": 1,
        "item_name": "Table",
        "item_description": "A nice sturdy table.",
        "item_quantity": 10,
        "item_price": 200
      },
      {
        "item_id": 2,
        "item_name": "Chair",
        "item_description": "A comfortable chair.",
        "item_quantity": 8,
        "item_price": 100
      },
      {
        "item_id": 3,
        "item_name": "Guitar",
        "item_description": "A beautiful guitar.",
        "item_quantity": 3,
        "item_price": 300
      },
      {
        "item_id": 4,
        "item_name": "Television",
        "item_description": "Flat screen television.",
        "item_quantity": 4,
        "item_price": 800
      },
      {
        "item_id": 5,
        "item_name": "Laptop",
        "item_description": "Super fast laptop.",
        "item_quantity": 3,
        "item_price": 1100
      }
    ]
  };

  $scope.item_id = $routeParams.item_id;

}]);

app.controller('UserController', ['$scope', function($scope) {

}]);

app.controller('AddproductController', ['$scope', function($scope) {

}]);

app.controller('SearchController', ['$scope', function($scope) {

}]);

app.controller('SettingsController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {

}]);

app.controller('MenuController', ['$scope', '$location', function($scope, $location) {
  $scope.activeIf = function(path) {
      if ($location.path().substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
  }

  $scope.hiddenIf = function(path) {
    if ($location.path().substr(0, path.length) == path) {
      return "no-display"
    } else {
      return ""
    }
  }
}]);
