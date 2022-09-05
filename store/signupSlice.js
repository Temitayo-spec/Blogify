// creating signupSlice

import { createSlice } from "@reduxjs/toolkit";

// get the user from local storage
let user;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) {
      return undefined;
    }
    user = JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

loadState();

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    user: {} || user,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      // adding fields to the user object
      state.user[action.payload.field] = action.payload.value;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setIsLoading } = signupSlice.actions;
export const selectUser = (state) => state.signup.user;
export const isLoading = (state) => state.signup.isLoading;

export const signupReducer = signupSlice.reducer;

// Path: store\signupSlice.js