angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('usersShow', {
      url: '/user/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('itemsIndex', {
      url: '/items',
      templateUrl: '/templates/itemsIndex.html',
      controller: 'ItemsIndexController as itemsIndex'
    })
    .state('itemsShow', {
      url: '/item/:id',
      templateUrl: '/templates/itemsShow.html',
      controller: 'ItemsShowController as itemsShow'
    })
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html'
    })
    .state('requestsOffers', {
      url: 'requestsOffers',
      templateUrl: '/templates/requestsOffers.html',
      controller: 'RequestsOffersController as requestsOffers'
    });

  $urlRouterProvider.otherwise('/');
}
