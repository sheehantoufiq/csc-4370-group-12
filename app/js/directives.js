'use strict';

/* Directives */


var app = angular.module('shelfspaceApp.directives', [])

app.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

app.directive('nxEqual', function() {
    return {
        require: 'ngModel',
        scope: false,
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(attrs.nxEqual, function (value) {
                ctrl.$setValidity('nxEqual', value === ctrl.$viewValue);
            });
            ctrl.$parsers.push(function (value) {
                var isValid = value === scope.$eval(attrs.nxEqual);
                ctrl.$setValidity('nxEqual', isValid);
                return isValid ? value : undefined;
            });
        }
    };
});

function RegistrationController($scope) {}