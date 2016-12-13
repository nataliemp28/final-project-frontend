angular.module('finalProject')
  .controller('ItemsIndexController', ItemsIndexController)
  .controller('ItemsShowController', ItemsShowController)
  .controller('ItemsEditController', ItemsEditController)
  .controller('ItemsNewController', ItemsNewController);

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
  itemsShow.formVisible = false;

  function toggleForm() {
    itemsShow.formVisible = itemsShow.formVisible ? false : true;
  }

  itemsShow.user = User.get({id: currentUserId});

  Item.get($state.params).$promise.then((data) => {
    itemsShow.item = data;

    User.get({id: currentUserId}).$promise.then((data) => {
      itemsShow.user = data;

      console.log('User current items:', itemsShow.user.item_ids);


      itemsShow.item.requests.forEach(function(request) {

        // If we've already offered this item before for the same thing then do this:
        if(itemsShow.user.item_ids.indexOf(request.offer_id) > -1) {
          const elementPos = itemsShow.user.items.map(function(x) {
            return x.id;
          }).indexOf(request.offer_id);
          const objectFound = itemsShow.user.items[elementPos];
          objectFound.alreadyOffered = true;
        }
      });
    });

    itemsShow.newSwap = {
      request_id: itemsShow.item.id,
      offer_id: null,
      accepted: false
    };
  });

  function selectOffer(item) {
    if (!item.alreadyOffered) {
      itemsShow.newSwap.offer_id = item.id;
    }
  }

  function createSwap() {
    // const thisSwap = itemsShow.item.data + resource.request.description.toString();
    //
    // if (thisSwap === 'unique')

      Swap.save(itemsShow.newSwap, (swap) => {
        console.log('saved swap:', swap);
        $state.go('requestsOffers');
      });
  }

  function deleteItem() {
    itemsShow.item.$remove(() => {
      $state.go('itemsIndex');
    });
  }
  itemsShow.selectOffer = selectOffer;
  itemsShow.toggleForm = toggleForm;
  itemsShow.createSwap = createSwap;
  itemsShow.delete = deleteItem;
  itemsShow.isLoggedIn = $auth.isAuthenticated;
}

ItemsNewController.$inject = ['Item', '$state'];
function ItemsNewController(Item, $state) {
  const itemsNew = this;

  itemsNew.item = {};

  function createItem() {
    Item.save(itemsNew.item, () => {
      $state.go('itemsIndex');
    });
  }

  itemsNew.create = createItem;
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
