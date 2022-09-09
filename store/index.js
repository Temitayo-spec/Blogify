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
import { loginReducer } from "./loginSlice";
import { signupReducer } from "./signupSlice";
import { tokenReducer } from "./token";
import { userReducer } from "./userSlice";
import { writeReducer } from "./writeSlice";

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
