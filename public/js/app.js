"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function r(){e.signup(o.user).then(function(){t.go("login")})}var o=this;o.user={},o.submit=r}function LoginController(e,t){function r(){e.login(o.credentials).then(function(){t.go("itemsIndex")})}var o=this;o.credentials={},o.submit=r}function Item(e,t){return new e(t+"/items/:id",{id:"@id"},{update:{method:"PUT"}})}function ItemsIndexController(e){var t=this;t.all=e.query()}function ItemsShowController(e,t,r,o,s){function l(){return r.getPayload().id===parseFloat(t.params.id)}function n(){m.formVisible=!m.formVisible}function i(e){e.alreadyOffered||(m.newSwap.offer_id=e.id)}function a(){s.save(m.newSwap,function(e){console.log("saved swap:",e),t.go("requestsOffers")})}function u(){m.item.$remove(function(){t.go("itemsIndex")})}var m=this,d=r.getPayload().id;m.isCurrentUser=l,m.item=e.get(t.params),m.formVisible=!1,m.user=o.get({id:d}),e.get(t.params).$promise.then(function(e){m.item=e,o.get({id:d}).$promise.then(function(e){m.user=e,console.log("User current items:",m.user.item_ids),m.item.requests.forEach(function(e){if(m.user.item_ids.indexOf(e.offer_id)>-1){var t=m.user.items.map(function(e){return e.id}).indexOf(e.offer_id),r=m.user.items[t];r.alreadyOffered=!0}})}),m.newSwap={request_id:m.item.id,offer_id:null,accepted:!1}}),m.selectOffer=i,m.toggleForm=n,m.createSwap=a,m.delete=u,m.isLoggedIn=r.isAuthenticated}function ItemsNewController(e,t){function r(){e.save(o.item,function(){t.go("itemsIndex")})}var o=this;o.item={},o.create=r}function ItemsEditController(e,t){function r(){o.item.$update(function(){t.go("itemsShow",t.params)})}var o=this;o.item=e.get(t.params),this.update=r}function MainController(e,t,r){function o(){e.logout().then(function(){t.go("home")})}function s(r,o,s){(!e.isAuthenticated()&&n.includes(o.name)||"usersEdit"===o.name&&parseFloat(s.id)!==e.getPayload().id)&&(r.preventDefault(),t.go("home"))}var l=this;l.isLoggedIn=e.isAuthenticated,l.message=null;var n=["usersEdit"];r.$on("$stateChangeStart",s),l.logout=o}function RequestsOffers(e,t){return new e(t+"/swaps/:id",{id:"@id"},{update:{method:"PUT"}})}function RequestsOffersController(e,t,r,o,s){var l=this,n=o.getPayload().id;l.myRequests=[],l.myOffers=[],l.all=s.query(),l.all.$promise.then(function(e){e.forEach(function(e){e.offer_id===n?l.myRequests.push(e):l.myOffers.push(e)})})}function Router(e,t,r){r.html5Mode(!0),e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("usersShow",{url:"/user/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersProfile",{url:"/users/profile",templateUrl:"/templates/usersProfile.html",controller:"UsersShowController as usersProfile"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("itemsIndex",{url:"/items",templateUrl:"/templates/itemsIndex.html",controller:"ItemsIndexController as itemsIndex"}).state("itemsShow",{url:"/items/:id",templateUrl:"/templates/itemsShow.html",controller:"ItemsShowController as itemsShow"}).state("itemsEdit",{url:"/items/:id/edit",templateUrl:"/templates/itemsEdit.html",controller:"ItemsEditController as itemsEdit"}).state("itemsNew",{url:"/items/new",templateUrl:"/templates/itemsNew.html",controller:"ItemsNewController as itemsNew"}).state("home",{url:"/",templateUrl:"/templates/home.html"}).state("requestsOffers",{url:"/requestsOffers",templateUrl:"/templates/requestsOffers.html",controller:"RequestsOffersController as requestsOffers"}),t.otherwise("/")}function Swap(e,t){return new e(t+"/swaps/:id",{id:"@id"},{update:{method:"PUT"}})}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,r){function o(){return r.getPayload().id===parseFloat(t.params.id)}function s(){l.user.$remove(function(){t.go("usersIndex")})}var l=this;l.user=e.get(t.params),l.isCurrentUser=o,l.user=e.get(t.params),l.delete=s,l.isLoggedIn=r.isAuthenticated}function UsersEditController(e,t){function r(){o.user.$update(function(){t.go("usersShow",t.params)})}var o=this;o.user=e.get(t.params),this.update=r}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").factory("Item",Item),Item.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ItemsIndexController",ItemsIndexController).controller("ItemsShowController",ItemsShowController).controller("ItemsEditController",ItemsEditController).controller("ItemsNewController",ItemsNewController),ItemsIndexController.$inject=["Item"],ItemsShowController.$inject=["Item","$state","$auth","User","Swap"],ItemsNewController.$inject=["Item","$state"],ItemsEditController.$inject=["Item","$state"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").factory("RequestsOffers",RequestsOffers),RequestsOffers.$inject=["$resource","API_URL"],angular.module("finalProject").controller("RequestsOffersController",RequestsOffersController),RequestsOffersController.$inject=["Item","Swap","$state","$auth","RequestsOffers"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],angular.module("finalProject").factory("Swap",Swap),Swap.$inject=["$resource","API_URL"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
