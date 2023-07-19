import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";

const store = configureStore({
  reducer: {
    products: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
