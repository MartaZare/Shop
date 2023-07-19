import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";
import checkoutSlice from "./reducers/checkoutSlice";

const store = configureStore({
  reducer: {
    products: cartSlice,
    checkout: checkoutSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
