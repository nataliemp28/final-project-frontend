angular.module('finalProject')
.controller('RequestsOffersController', RequestsOffersController);

RequestsOffersController.$inject = ['Item', 'Swap', '$state', '$auth', 'RequestsOffers', 'User'];

function RequestsOffersController(Item, Swap, $state, $auth, RequestsOffers, User) {

  const requestsOffersIndex = this;
  const currentUserId = $auth.getPayload().id;

  requestsOffersIndex.currentUser = User.get({id: currentUserId});

  function cancelRequest(swap) {
    Swap.delete(swap, () => {
      requestsOffersIndex.currentUser = User.get({id: currentUserId});
    });
  }

  function acceptSwap(swap) {
    swap.accepted = true;
    Swap.update(swap);
  }

  function declineSwap(swap) {
    swap.accepted = false;
    Swap.update(swap);
  }

  requestsOffersIndex.cancelRequest = cancelRequest;
  requestsOffersIndex.acceptSwap = acceptSwap;
  requestsOffersIndex.declineSwap = declineSwap;

}
