angular.module('finalProject')
.controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;
  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('home');
    });
  }
  const protectedStates = ['usersEdit', 'usersIndex', 'usersShow'];

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
