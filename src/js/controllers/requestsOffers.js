angular.module('finalProject')
.controller('RequestsOffersController', RequestsOffersController);

RequestsOffersController.$inject = ['Item', 'Swap', '$state', '$auth', 'RequestsOffers'];

function RequestsOffersController(Item, Swap, $state, $auth, RequestsOffers) {
  const requestsOffersIndex = this;
  const currentUserId = $auth.getPayload().id;

  requestsOffersIndex.myRequests = [];
  requestsOffersIndex.myOffers = [];

  requestsOffersIndex.all = RequestsOffers.query();
  requestsOffersIndex.all.$promise.then(requestsOffers => {
    requestsOffers.forEach(requestOffer => {
      if (requestOffer.offer_id === currentUserId) {
        requestsOffersIndex.myRequests.push(requestOffer);
      } else {
        requestsOffersIndex.myOffers.push(requestOffer);
      }
    });
  });
}
