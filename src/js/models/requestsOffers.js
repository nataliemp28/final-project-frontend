angular.module('finalProject')
  .factory('RequestsOffers', RequestsOffers);

RequestsOffers.$inject = ['$resource', 'API_URL'];
function RequestsOffers($resource, API_URL) {
  return new $resource(`${API_URL}/swaps/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
