import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartSliceProps {
  cart: ProductsProps[];
}

const initialState: CartSliceProps = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductsProps>) => {
      const itemToAdd = action.payload;
      const existingItem = state.cart.find(
        (item) => item._id === itemToAdd._id
      );

      const newCart = existingItem
        ? state.cart.map((item) => {
            if (item._id === itemToAdd._id) {
              return itemToAdd;
            } else {
              return item;
            }
          })
        : (state.cart = [...state.cart, itemToAdd]);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload.id);
    },
    emptyCart: (state, action) => {},
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
