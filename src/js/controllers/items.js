angular.module('finalProject')
  .controller('ItemsIndexController', ItemsIndexController)
  .controller('ItemsShowController', ItemsShowController)
  .controller('ItemsEditController', ItemsEditController);

ItemsIndexController.$inject = ['Item'];
function ItemsIndexController(Item) {
  const itemsIndex = this;

  itemsIndex.all = Item.query();
}

ItemsShowController.$inject = ['Item', '$state', '$auth', 'User', 'Swap'];
function ItemsShowController(Item, $state, $auth, User, Swap) {

  const itemsShow = this;
  const currentUserId = $auth.getPayload().id;

  function isCurrentUser() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }
  // get payload gives us current users id - user ID is IN TOKEN (BACKEND)
  itemsShow.isCurrentUser = isCurrentUser;
  itemsShow.item = Item.get($state.params);

  itemsShow.user = User.get({id: currentUserId});

  Item.get($state.params).$promise.then((data) => {
    itemsShow.item = data;

    itemsShow.newSwap = {
      request_id: itemsShow.item.id,
      offer_id: null,
      accepted: false
    };
  });

  function selectOffer(id) {
    itemsShow.newSwap.offer_id = id;
  }

  function createSwap() {
    Swap.save(itemsShow.newSwap, (swap) => {
      // $state.go('userSwaps') To be updated
      console.log('saved:', swap);
    });
  }

  function deleteItem() {
    itemsShow.item.$remove(() => {
      $state.go('itemsIndex');
    });
  }
  itemsShow.selectOffer = selectOffer;
  itemsShow.createSwap = createSwap;
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
