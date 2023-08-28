import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../other/Types";

const initialState: Product[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      return [...state, action.payload];
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const productToDelete = state.find((product) => product.id === id);

      if (productToDelete) {
        return state.filter((product) => product.id !== productToDelete.id);
      }

      return state;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
