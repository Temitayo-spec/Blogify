import { createSlice } from "@reduxjs/toolkit";

// let user;

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("user");
//     if (serializedState === null) {
//       return undefined;
//     }

//     // set user to the value of the serializedState
//     user = JSON.parse(serializedState);
//     return user;
//   } catch (err) {
//     return undefined;
//   }
// };


// loadState();

// create loginSlice
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    userDetails: {},
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user[action.payload.field] = action.payload.value;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

// export loginSlice actions
export const { setUser, setIsLoading, setUserDetails } = loginSlice.actions;

// export loginSlice selectors
export const selectLoginUser = (state) => state.login.user;
export const isLoading = (state) => state.login.isLoading;
export const selectUserDetails = (state) => state.login.userDetails;

// export loginSlice reducer
export const loginReducer = loginSlice.reducer;
