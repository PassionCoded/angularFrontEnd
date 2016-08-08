module.exports = function(app) {
  app.controller('LandingController', ['$location', '$timeout', function($location, $timeout) {
    this.redirectIfToken = function() {
      if (window.localStorage.getItem('token')) {
        $location.path('/dashboard');
      }
    };

    this.redirect = function(url) {
      $location.path(url);
    };

    this.timeoutRedirect = function(time){
      $timeout(this.redirectIfToken, time)
    };

    if ($location.path() === '/') this.class = 'landing';
  }]);
};
