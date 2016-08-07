module.exports = function(app) {
  app.controller('LandingController', ['$location', function($location) {
    this.redirectIfToken = function() {
      if (window.localStorage.getItem('token')) {
        $location.path('/dashboard');
      }
    };

    this.redirect = function(url) {
      $location.path(url);
    };

    this.class = 'landing';
  }]);
};
