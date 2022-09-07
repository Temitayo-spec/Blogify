import { createSlice } from "@reduxjs/toolkit";

// create loginSlice
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user[action.payload.field] = action.payload.value;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// export loginSlice actions
export const { setUser, setIsLoading } = loginSlice.actions;

// export loginSlice selectors
export const selectLoginUser = (state) => state.login.user;
export const isLoading = (state) => state.login.isLoading;

// export loginSlice reducer
export const loginReducer = loginSlice.reducer;
