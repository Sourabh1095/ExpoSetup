import { createSlice } from "@reduxjs/toolkit";

const loggedSlice = createSlice({
  name: "logged",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    loggedState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { loggedState } = loggedSlice.actions;
export default loggedSlice.reducer;
