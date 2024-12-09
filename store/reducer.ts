import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

//registration
import createAccount from "./auth/createAccount";
const reducers = combineReducers({
  createAccount,
});
const rootReducer = (state: any, action: any) => {
  //   if (action.type === "is-user-logged-in/reset") {
  //     // clearToken();
  //     state = {
  //       userOnboard: state.userOnboard,
  //     };
  //     AsyncStorage.clear();
  //   }
  return reducers(state, action);
};

export default rootReducer;
