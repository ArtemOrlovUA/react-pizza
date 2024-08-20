import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

// const pizzaExample = {
//   pizzaId: 12,
//   name: 'Mediterranean',
//   quantity: 2,
//   unitPrice: 16,
//   totalPrice: 32,
// };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload is pizza object
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload is pizza object
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload.pizzaId,
      );
    },
    increaseItemQuantity(state, action) {
      // payload is pizza id integer
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      console.log(item);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload is pizza id integer
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload,
        );
      }
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
