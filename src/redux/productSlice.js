import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProductAction(state, action) {
      return [...state, action.payload];
    },
    updateProductAction(state, action) {
      const updatedProductIndex = state.findIndex(
        product => product.id === action.payload.id
      );
      if (updatedProductIndex !== -1) {
        state[updatedProductIndex] = action.payload;
      }
    },
    removeProductAction(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addProductAction, updateProductAction, removeProductAction } =
  productSlice.actions;
export const productsReducer = productSlice.reducer;
