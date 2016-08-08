const URL = require(__dirname + '/../../config');

module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', function($http, $location) {
    this.signup = false;
    this.buttonText = 'Login';
    this.linkedInState = 'default';
    this.authenticate = function(user) {
      $http.post(URL.baseUrl + '/auth_user', JSON.stringify(user))
        .then((res) => {
          console.log('success!')
          console.log(res);
          window.localStorage.setItem('token', res.data.auth_token);
          $location.path('/dashboard');
        }, (err) => {
          console.log('there was an error');
          console.log(err);
        });
    };
  }]);
};
