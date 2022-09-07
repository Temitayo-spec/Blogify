import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash.throttle";
import { loginReducer } from "./loginSlice";
import { loadState, saveState } from "./redux-persist";
import { signupReducer } from "./signupSlice";
import { tokenReducer } from "./token";
import { userReducer } from "./userSlice";
import { writeReducer } from "./writeSlice";

const persistedState = loadState();
const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    write: writeReducer,
    token: tokenReducer,
    userDetails: userReducer,
  },
  preloadedState: persistedState,
});

// Persist redux state every second
store.subscribe(
  throttle(() => {
    saveState({
      userDetails: store.getState().userDetails,
      token: store.getState().token,
    });
  }, 1000)
);

export default store;
