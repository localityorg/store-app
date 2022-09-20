import { ACCEPT_ORDER, SET_ORDERS, CANCEL_ORDER } from "../actions";

var orderState = {
  orders: [],
  lastOrder: null,
};

export function ordersReducer(state: any = orderState, action: any) {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case ACCEPT_ORDER:
      return { ...state, lastOrder: action.payload };
    case CANCEL_ORDER:
      return { ...state, lastOrder: action.payload };
    default:
      return state;
  }
}
