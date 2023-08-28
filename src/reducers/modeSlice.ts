import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: false,
  reducers: {
    light: () => {
      return true;
    },
    dark: () => {
      return false;
    },
  },
});

export const { light, dark } = modeSlice.actions;

export default modeSlice.reducer;
