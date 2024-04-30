import { createSlice } from "@reduxjs/toolkit";
import category from "../../json/category";

const catFav = createSlice({
  name: "categoryFavorite",
  initialState: {
    category: category[0],
    favorites: [],
  },
  reducers: {
    categoryState: (state, action) => {
      state.category = action.payload;
    },
    addFavorite: (state, action) => {
      if (state.favorites.some((item) => item.id == action.payload.id)) return;
      else {
        state.favorites = state.favorites.concat(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCatFav: (state, action) => {
      state.favorites = [];
      state.category = category[0];
    },
  },
});

export const { categoryState, addFavorite, removeFavorite, clearCatFav } = catFav.actions;
export default catFav.reducer;
