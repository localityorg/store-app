import { ADD_CART_ITEM, REMOVE_CART_ITEM, EMPTY_CART } from "../actions";

var cartState = {
  tempCart: <any[]>[],
  cart: <any[]>[
    {
      brand: undefined,
      id: "63417cc5913725fbe999308a",
      itemQuantity: "1",
      name: "Britannia Good Day Cashew Cookies",
      price: { discount: "40.00", mrp: "50.00" },
      quantity: { count: "200", type: "gm" },
      totalPrice: "50",
      url: "ed730342-647f-4a10-ac3f-dcc617e40f81",
    },
  ],
  empty: <boolean>true,
};

const sortCart = (cart: any) => {
  var tempArray: any[] = [];
  var sortedCart: any[] = [];
  cart?.forEach((item: any) => {
    var i = tempArray.findIndex((x) => x.id == item.id);
    if (i <= -1) {
      tempArray.push(item);
    }
  });
  tempArray.map((obj: any) => {
    const count = cart.filter((e: any) => e.id === obj.id).length;

    const totalItemPrice = count * parseFloat(obj.price.mrp);
    sortedCart.push({
      ...obj,
      itemQuantity: count.toString(),
      totalPrice: totalItemPrice.toString(),
    });
  });

  sortedCart.sort((a, b) => a.id - b.id);
  return sortedCart;
};

function addToCart(fetchedData: any) {
  const itemToAdd = {
    id: fetchedData.id,
    name: fetchedData.name,
    brand: fetchedData.brand,
    quantity: fetchedData.quantity,
    url: fetchedData.url,
    price: fetchedData.price,
  };
  cartState.tempCart.push(itemToAdd);
  const cart = [...cartState.tempCart];
  return sortCart(cart);
}

function removeFromCart(fetchedData: any) {
  const cart = [...cartState.tempCart];
  if (cart.find((e) => e.id === fetchedData.id) !== undefined) {
    const indEx = cart.findIndex((e) => e.id === fetchedData.id);
    cart.splice(indEx, 1);
    cartState.tempCart = cart;
  }
  return sortCart(cart);
}

function emptyCart() {
  cartState.tempCart = [];
  cartState.empty = true;
  return true;
}

export function cartReducer(state: any = cartState, action: any) {
  switch (action.type) {
    case ADD_CART_ITEM:
      const updatedCart = addToCart(action.payload);
      if (updatedCart.length > 0) {
        state.cart.empty = false;
      }
      return { ...state, cart: updatedCart };
    case REMOVE_CART_ITEM:
      const newItemCart = removeFromCart(action.payload);
      if (newItemCart.length === 0) {
        state.cart.empty = true;
      }
      return { ...state, cart: newItemCart };
    case EMPTY_CART:
      emptyCart();
      return { ...state, cart: [] };
    default:
      return state;
  }
}
