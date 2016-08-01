const URL = require(__dirname + '/../config');

module.exports = function(app) {
  app.controller('DashboardController', ['$http', function($http) {
    this.getUserData = function() {
      console.log($http.defaults.headers.common.Authorization);
      $http.get(URL.baseUrl + '/user_info')
        .then((res) => {
          console.log('success!')
          console.log(res);
          this.userData = res.data.user;
        }, (err) => {
          console.log('there was an error');
          console.log(err);
        });
    };
    this.updateProfile = function(profile) {
      $http.post(URL.baseUrl + '/profile', JSON.stringify({profile}))
        .then((res) => {
          console.log('amazing profile');
          this.userData = res.data.user;
        }, (err) => {
          console.log('some sort of error');
          console.log(err);
        });
    };

    this.updatePassions = function(passions) {
      $http.post(URL.baseUrl + '/passions', JSON.stringify({'passions': [passions]}))
        .then((res) => {
          console.log('such passion');
          this.userData = res.data.user;
        }, (err) => {
          console.log('some sort of error');
          console.log(err);
        });
    };
  }]);
};
