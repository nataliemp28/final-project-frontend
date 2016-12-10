angular.module('finalProject')
  .factory('Item', Item);

Item.$inject = ['$resource'];
function Item($resource) {
  return new $resource('/items/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
