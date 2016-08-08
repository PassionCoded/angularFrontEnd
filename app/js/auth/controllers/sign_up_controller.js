const URL = require(__dirname + '/../../config');

module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location', function($http, $location) {
    this.signup = true;
    this.buttonText = 'Sign Up';
    this.authenticate = function(user) {
      $http.post(URL.baseUrl + '/reg_user', JSON.stringify({user}))
        .then((res) => {
          console.log('success!')
          console.log(res);
          window.localStorage.setItem('token', res.data.auth_token);
          $location.path('/make-profile');
        }, (err) => {
          console.log('there was an error');
          console.log(err);
        });
    };
  }]);
};
