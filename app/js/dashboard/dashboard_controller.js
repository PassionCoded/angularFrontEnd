const URL = require(__dirname + '/../config');

module.exports = function(app) {
  app.controller('DashboardController', ['$http', '$location', function($http, $location) {

    this.getUserData = function() {
      $http.defaults.headers.common.Authorization = 'Bearer ' +  window.localStorage.getItem('token');
      $http.get(URL.baseUrl + '/user_info')
        .then((res) => {
          this.userData = res.data.user;
        }, (err) => {
          console.log('there was an error');
          console.log(err);
        });
    };
    this.updateProfile = function(profile) {
      $http.post(URL.baseUrl + '/profile', JSON.stringify({profile}))
        .then((res) => {
          this.userData = res.data.user;
        }, (err) => {
          console.log('some sort of error');
          console.log(err);
        });
      this.clearInputs();
    };

    this.updatePassions = function(passion) {
      if(this.passionExists(passion)) {
          this.duplicatePassion = true;
          this.duplicatePassionName = passion.name;
        } else {
          $http.post(URL.baseUrl + '/passions', JSON.stringify({'passions': [passion]}))
          .then((res) => {
            this.userData = res.data.user;
            if (this.duplicatePassion) this.toggleDuplicatePassion();
          }, (err) => {
            console.log('some sort of error');
            console.log(err);
          });
        }
      this.clearInputs();
    };

    this.signOut = function() {
      window.localStorage.removeItem('token');
      $location.path('/');
    };

    this.clearInputs = function() {
      var inputTags = document.getElementsByTagName('input');
      for (var i = 0; i < inputTags.length; i++) {
        inputTags[i].value = null;
        inputTags[i].checked = false;
      }
    };

    this.passionExists = function(passion) {
      for (var i = 0; i < this.userData.passions.length; i++) {
        if (passion.name === this.userData.passions[i].name) return true;
      }
      return false;
    };

    this.toggleDuplicatePassion = function() {
      this.duplicatePassion = !this.duplicatePassion;
      this.duplicatePassionName = '';
    };

  }]);
};
