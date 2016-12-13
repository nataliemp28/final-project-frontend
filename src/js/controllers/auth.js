angular.module('finalProject')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state', 'User'];
function RegisterController($auth, $state, user) {
  const register = this;

  register.user = {};
  user.isLoggedIn = $auth.isAuthenticated;

  if (user.isLoggedIn()) {
    const currentUserId = $auth.getPayload().id;
    $state.go('itemsShow', {id: currentUserId});
  }

  function submit() {
    $auth.signup(register.user)
      .then(() => {
        $state.go('login');
      });
  }
  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
      .then(() => {
        $state.go('itemsIndex');
      });
  }

  login.submit = submit;
}
