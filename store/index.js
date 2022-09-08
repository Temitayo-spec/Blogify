import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import throttle from "lodash.throttle";
import { loginReducer } from "./loginSlice";
import { loadState, saveState } from "./redux-persist";
import { signupReducer } from "./signupSlice";
import { tokenReducer } from "./token";
import { userReducer } from "./userSlice";
import { writeReducer } from "./writeSlice";

// const persistedState = loadState();
// const store = configureStore({
//   reducer: {
//     signup: signupReducer,
//     login: loginReducer,
//     write: writeReducer,
//     token: tokenReducer,
//     userDetails: userReducer,
//   },
//   preloadedState: persistedState,
// });

// // Persist redux state every second
// store.subscribe(
//   throttle(() => {
//     saveState({
//       userDetails: store.getState().userDetails,
//       token: store.getState().token,
//     });
//   }, 1000)
// );

// export default store;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userDetails", "token"],
};

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  write: writeReducer,
  token: tokenReducer,
  userDetails: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

console.log(store.getState());
