angular.module('finalProject')
.controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope', 'User'];
function MainController($auth, $state, $rootScope, User) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('home');
    });
  }

  const user = $auth.getPayload();
  // console.log(user);

  User.get(user, ((res) => {
    main.username = res.username;
  })
);

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
