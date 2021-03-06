const angular = require('angular');
require('angular-route');
var passionCoded = angular.module('passionCoded', ['ngRoute']);

require('./auth')(passionCoded);
require('./dashboard')(passionCoded);
require('./landing')(passionCoded);

passionCoded.config(['$routeProvider', function($rp) {
  $rp
    .when('/', {
      templateUrl: 'templates/landing_view.html',
      controller: 'LandingController',
      controllerAs: 'landingctrl'
    })
    .when('/confirmation', {
      templateUrl: 'templates/confirmation_view.html',
      controller: 'LandingController',
      controllerAs: 'landingctrl'
    })
    .when('/signup', {
      templateUrl: 'templates/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .when('/dashboard', {
      templateUrl: 'templates/dashboard_view.html',
      controller: 'DashboardController',
      controllerAs: 'dashctrl'
    })
    .when('/make-profile', {
      templateUrl: 'templates/complete_profile_view.html',
      controller: 'DashboardController',
      controllerAs: 'dashctrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
