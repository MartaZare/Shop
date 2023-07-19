import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../other/Types";

const initialState: Product[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const productToDelete = state.find((product) => product.id == id);

      if (productToDelete) {
        return state.filter((product) => product.id != id);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
