angular.module('finalProject')
  .factory('Swap', Swap);

Swap.$inject = ['$resource', 'API_URL'];
function Swap($resource, API_URL) {
  return new $resource(`${API_URL}/swaps/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
