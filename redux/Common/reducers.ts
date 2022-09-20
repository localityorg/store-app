import { SET_LOCATION } from "./actions";

var locationState = {
  location: null,
};

export function locationReducer(state: any = locationState, action: any) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.payload };
    default:
      return state;
  }
}

import { SET_USER, REMOVE_USER, removeFromStorage } from "./actions";

import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

var userState = {
  user: null,
};

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

getValueFor("jwtToken").then((data) => {
  if (data) {
    const decodedToken: any = jwtDecode(data);
    if (decodedToken.exp * 1000 < Date.now()) {
      removeFromStorage("jwtToken");
      removeFromStorage("refreshToken");
    } else {
      userState.user = { ...decodedToken, data };
    }
  }
});

export function userReducer(state = userState, action: any) {
  switch (action.type) {
    case SET_USER:
      return { ...state, store: action.payload };
    case REMOVE_USER:
      return { ...state, store: null };
    default:
      return state;
  }
}
