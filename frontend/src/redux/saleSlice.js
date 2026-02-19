import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sales: [],
    loading: false,
    error: null,
};

const saleSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        fetchSalesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSalesSuccess: (state, action) => {
            state.loading = false;
            state.sales = action.payload;
        },
        fetchSalesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addSaleSuccess: (state, action) => {
            state.sales.push(action.payload);
        },
    },
});

export const { fetchSalesStart, fetchSalesSuccess, fetchSalesFailure, addSaleSuccess } = saleSlice.actions;
export default saleSlice.reducer;
