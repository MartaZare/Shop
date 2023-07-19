import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: false,
  reducers: {
    purchased: () => {
      return true;
    },
    notPurchased: () => {
      return false;
    },
  },
});

export const { purchased, notPurchased } = checkoutSlice.actions;

export default checkoutSlice.reducer;
