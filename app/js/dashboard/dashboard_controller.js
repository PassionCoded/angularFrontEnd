const config = require(__dirname + '/../config');
const md5 = require('md5');

module.exports = function(app) {
  app.controller('DashboardController', ['$http', '$location', '$route', function($http, $location, $route) {

    this.userData = this.userData || {passions: []};
    this.passionsToDelete = [];

    this.getToken = function() {
        $http.defaults.headers.common.Authorization = 'Bearer ' +  window.localStorage.getItem('token');
    };

    this.getUserData = function() {
      this.getToken();
      $http.get(config.baseUrl + '/user_info')
        .then((res) => {
          this.userData = res.data.user;
          this.gravatarHash = md5(this.userData.email);
        }, (err) => {
          console.log(err);
        });
    };
    this.updateProfile = function(profile) {
      $http.post(config.baseUrl + '/profile', JSON.stringify({profile}))
        .then((res) => {
          this.userData = res.data.user;
        }, (err) => {
          console.log(err);
        });
    };

    this.updatePassions = function(passion) {
      if(this.passionExists(passion)) {
          this.duplicatePassion = true;
          this.duplicatePassionName = passion.name;
        } else {
          $http.post(config.baseUrl + '/passions', JSON.stringify({'passions': [passion]}))
          .then((res) => {
            this.userData = res.data.user;
            if (this.duplicatePassion) this.toggleDuplicatePassion();
          }, (err) => {
            console.log(err);
          });
        }
    };

    this.signOut = function() {
      window.localStorage.removeItem('token');
      $location.path('/');
    };

    this.updateAll = function(profile, passion) {
      if (profile) this.updateProfile(profile);
      if (passion) this.updatePassions(passion);
      this.clearInputs();
      this.editingProfile = this.editingPassions = false;
      if ($location.path() !== '/dashboard') $location.path('/confirmation');
    };

    this.clearInputs = function() {
      var inputTags = document.getElementsByTagName('input');
      for (var i = 0; i < inputTags.length; i++) {
        inputTags[i].value = null;
        inputTags[i].checked = false;
      }
    };

    this.passionExists = function(passion) {
      if (this.userData.passions.length) {
        for (var i = 0; i < this.userData.passions.length; i++) {
          if (passion.name.toLowerCase() === this.userData.passions[i].name) return true;
        }
        return false;
      }
    };

    this.deletePassion = function(passion) {
      var id = passion.id;
      this.userData.passions.splice(this.userData.passions.indexOf(passion), 1);
      $http.delete(config.baseUrl + '/passions/' + id)
      .then((res) => {
        this.userData = res.data.user;
      }, (err) => {
        console.log(err);
      });
    }

    this.toggleDuplicatePassion = function() {
      this.duplicatePassion = !this.duplicatePassion;
      this.duplicatePassionName = '';
    };




    this.buttonText = 'Update User';

    this.updateUser = function(user) {
      $http.put(config.baseUrl + '/edit_user', JSON.stringify({user}))
        .then((res) => {
          $route.reload();
        }, (err) => {
          console.log(err);
        });
    };

    this.deleteUser = function(email) {
      if (email === this.userData.email) {
        return $http.delete(config.baseUrl + '/del_user')
          .then((res) => {
            this.signOut();
          }, (err) => {
            console.log(err);
          });
      }
      this.incorrectEmail = true;
    }

  }]);
};
