angular.module('finalProject')
.controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope', 'User'];
function MainController($auth, $state, $rootScope, User) {

  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  // main.userId = $auth.getPayload().id;
  main.message = null;

  function getCurrentUser() {
    if ($auth.getPayload()) {
      User.get({ id: $auth.getPayload().id }, (user) => {
        main.currentUser = user;
      });
    }
  }
  getCurrentUser();

  $rootScope.$on('loggedIn', getCurrentUser);

  function logout() {
    main.currentUser = null;
    $auth.logout()
    .then(() => {
      $state.go('home');
    });
  }

  const protectedStates = ['usersEdit'];

  function secureState(e, toState, toParams) {

    if((!$auth.isAuthenticated() &&
    protectedStates.includes(toState.name)) ||
    toState.name === 'usersEdit' && (parseFloat(toParams.id) !== $auth.getPayload().id)) {
      e.preventDefault();
      $state.go('home');
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;

}
