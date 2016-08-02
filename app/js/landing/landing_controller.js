module.exports = function(app) {
  app.controller('LandingController', ['$location', function($location) {
    this.redirectIfToken = function() {
      if (window.localStorage.getItem('token')) {
        $location.path('/dashboard');
      }
    };
  }]);
};
