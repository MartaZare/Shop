import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: false,
  reducers: {
    vinted: () => {
      return true;
    },
    rpg: () => {
      return false;
    },
  },
});

export const { vinted, rpg } = modeSlice.actions;

export default modeSlice.reducer;
