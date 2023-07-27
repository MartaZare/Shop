import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../other/Types";

interface UserProductsState {
  userProducts: Product[];
}

const initialState: UserProductsState = {
  userProducts: [],
};

export const userProductsSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {
    setUserProducts: (state, action: PayloadAction<Product[]>) => {
      return {
        ...state,
        userProducts: action.payload,
      };
    },
  },
});

export const { setUserProducts } = userProductsSlice.actions;

export default userProductsSlice.reducer;
