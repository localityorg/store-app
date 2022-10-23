import { ProductProps } from "../../../components/Store/OrderCard";
import { SET_INVENTORY } from "../actions";

var inventoryState = {
  inventory: [],
  change: [],
};

function addToInventory(product: ProductProps) {
  const p = { ...product };
}

function removeFromInventory() {}

export function inventoryReducer(state = inventoryState, action: any) {
  switch (action.type) {
    case SET_INVENTORY:
      return { ...state, inventory: action.payload };
    default:
      return state;
  }
}
