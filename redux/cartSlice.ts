import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
    emptyCart: (state, action) => {},
  },
});

export default cartSlice = cartSlice.actions;
export const { addToCart, removeFromCart, emptyCart } = cartSlice.reducer;
