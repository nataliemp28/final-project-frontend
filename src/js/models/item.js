angular.module('finalProject')
  .factory('Item', Item);

Item.$inject = ['$resource', 'API_URL'];
function Item($resource, API_URL) {
  return new $resource(`${API_URL}/items/:id`, { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
