import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid'

import { Cart, CartItem } from "../../types/Cart";
import { Product } from "../../types/Product";

const initialState: Cart = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const item: CartItem = {
        ...action.payload,
        quantity: 1,
        amount: action.payload.price,
        cartId: uuidv4()
      };
      state.items.push(item);
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const index = state.items.findIndex(
        (item) => item.cartId === cartItemId
      );
      if (index !== -1) {
        const removedItem = state.items.splice(index, 1)[0];
        state.totalQuantity -= removedItem.quantity;
        state.totalAmount -= removedItem.amount;
      }
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const item = state.items.find((item) => item.cartId === cartItemId);
      if (item) {
        item.quantity += 1;
        item.amount = item.quantity * item.price;
        state.totalQuantity += 1;
        state.totalAmount += item.price;
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const item = state.items.find((item) => item.cartId === cartItemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.amount = item.quantity * item.price;
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
