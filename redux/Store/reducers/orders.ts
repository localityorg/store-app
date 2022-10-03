import { ACCEPT_ORDER, SET_ORDERS } from "../actions";

var orderState = {
  orders: [],
  pending: [],
  lastOrder: null,
};

function stackPendingOrders(orders: Array<[]>) {
  var stack = [...orders];

  var pending = orders.filter(
    (order: any) => order.state.order.accepted === false
  );

  pending.forEach((order: any) => {
    const index = stack.findIndex((o: any) => o.id === order.id);
    stack.splice(index, 1);
  });

  return [...pending, ...stack];
}

export function ordersReducer(state: any = orderState, action: any) {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: stackPendingOrders(action.payload) };
    case ACCEPT_ORDER:
      return { ...state, lastOrder: action.payload };
    default:
      return state;
  }
}
