// setting up userSlice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export const selectUserDetails = (state) => state.userDetails.userDetails;

export const userReducer = userSlice.reducer;
