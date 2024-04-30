import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    dateRange: {},
    currentMonth: null,
    propertyType: null,
    price: null,
    ratings: null,
    filter: false,
  },
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearFilter: (state, action) => {
      state.dateRange = {};
      state.currentMonth = null;
      state.propertyType = null;
      state.price = null;
      state.ratings = null;
      state.filter = false;
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
