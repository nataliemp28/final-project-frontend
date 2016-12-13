angular.module('finalProject')
.controller('UsersIndexController', UsersIndexController)
.controller('UsersShowController', UsersShowController)
.controller('UsersEditController', UsersEditController)
.controller('UsersProfileController', UsersProfileController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state', '$auth'];
function UsersShowController(User, $state, $auth) {

  const usersShow = this;
  usersShow.user = User.get($state.params);

  function isCurrentUser() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }

  // get payload gives us current users id - user ID is IN TOKEN (BACKEND)
  usersShow.isCurrentUser = isCurrentUser;
  usersShow.user = User.get($state.params);

  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }

  usersShow.delete = deleteUser;
  usersShow.isLoggedIn = $auth.isAuthenticated;
}

UsersProfileController.$inject = ['User', '$state', '$auth'];
function UsersProfileController(User, $state, $auth) {

  const usersProfile = this;
  usersProfile.user = User.get($state.params);

  function isCurrentUser() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }
  // get payload gives us current users id - user ID is IN TOKEN (BACKEND)
  usersProfile.isCurrentUser = isCurrentUser;
  usersProfile.user = User.get($state.params);
}

UsersEditController.$inject = ['User', '$state'];

function UsersEditController(User, $state) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);

  function update() {
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }
  this.update = update;
}
