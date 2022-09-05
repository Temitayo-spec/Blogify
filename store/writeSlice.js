// setting up the writeSlice reducer
import { createSlice } from "@reduxjs/toolkit";

// create writeSlice
const writeSlice = createSlice({
  name: "write",
  initialState: {
    title: "",
    desc: "",
    photo: "",
    categories: [],
    isLoading: false,
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// export writeSlice actions
export const { setTitle, setDesc, setPhoto, setCategories, setIsLoading } =
  writeSlice.actions;

// export writeSlice selectors
export const selectTitle = (state) => state.write.title;
export const selectDesc = (state) => state.write.desc;
export const selectPhoto = (state) => state.write.photo;
export const selectCategories = (state) => state.write.categories;
export const selectIsLoading = (state) => state.write.isLoading;

// export writeSlice reducer
export const writeReducer = writeSlice.reducer;
