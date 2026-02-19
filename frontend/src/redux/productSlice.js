import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addProductSuccess: (state, action) => {
            state.products.push(action.payload);
        },
        updateProductSuccess: (state, action) => {
            const index = state.products.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProductSuccess: (state, action) => {
            state.products = state.products.filter(p => p._id !== action.payload);
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    addProductSuccess,
    updateProductSuccess,
    deleteProductSuccess
} = productSlice.actions;

export default productSlice.reducer;
