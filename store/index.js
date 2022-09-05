import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash.throttle";
import { loginReducer } from "./loginSlice";
import { loadState, saveState } from "./redux-persist";
import { signupReducer } from "./signupSlice";
import { writeReducer } from "./writeSlice";

const persistedState = loadState();
const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    write: writeReducer,
  },
  preloadedState: persistedState,
});

// // Persist redux state every second
// store.subscribe(
//   throttle(() => {
//     saveState({
//       login: store.getState().login,
//     });
//   }, 1000)
// );

export default store;
