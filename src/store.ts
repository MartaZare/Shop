import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";
import checkoutSlice from "./reducers/checkoutSlice";
import userSlice from "./reducers/userSlice";
import userProductsSlice from "./reducers/userProductsSlice";

const store = configureStore({
  reducer: {
    products: cartSlice,
    checkout: checkoutSlice,
    user: userSlice,
    userProducts: userProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
