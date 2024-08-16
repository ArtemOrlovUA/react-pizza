import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const pizzaExample = {
  pizzaId: 12,
  name: 'Mediterranean',
  quantity: 2,
  unitPrice: 16,
  totalPrice: 32,
};

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
      const { pizzaId } = action.payload;
      const item = state.cart.find((item) => item.pizzaId === pizzaId);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload is pizza id integer
      const { pizzaId } = action.payload;
      const item = state.cart.find((item) => item.pizzaId === pizzaId);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state, action) {
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
