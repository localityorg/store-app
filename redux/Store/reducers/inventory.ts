var inventoryState = {
  inventory: null,
};
export function inventoryReducer(state = inventoryState, action: any) {
  switch (action.type) {
    case SET_INVENTORY:
      return { ...state, inventory: action.payload };
    default:
      return state;
  }
}
