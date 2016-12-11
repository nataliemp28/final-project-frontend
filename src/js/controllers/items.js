angular.module('finalProject')
  .controller('ItemsIndexController', ItemsIndexController)
  .controller('ItemsShowController', ItemsShowController)
  .controller('ItemsEditController', ItemsEditController);

ItemsIndexController.$inject = ['Item'];
function ItemsIndexController(Item) {
  const itemsIndex = this;

  itemsIndex.all = Item.get();
}
ItemsShowController.$inject = ['Item', '$state', '$auth'];
function ItemsShowController(Item, $state, $auth) {
  const itemsShow = this;

  itemsShow.item = Item.get($state.params);

  function deleteItem() {
    itemsShow.item.$remove(() => {
      $state.go('itemsIndex');
    });
  }
  itemsShow.delete = deleteItem;
  itemsShow.isLoggedIn = $auth.isAuthenticated;
}
ItemsEditController.$inject = ['Item', '$state'];
function ItemsEditController(Item, $state) {
  const itemsEdit = this;

  itemsEdit.item = Item.get($state.params);

  function update() {
    itemsEdit.item.$update(() => {
      $state.go('itemsShow', $state.params);
    });
  }

  this.update = update;

}
