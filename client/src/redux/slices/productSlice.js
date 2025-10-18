import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    products: [],
    productLoading: false,
    productError: false,
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productFetchStart: (state) => {
            state.productLoading = true
            state.productError = null

        },
        productFetchSuccess: (state, { payload }) => {
            state.productLoading = false
            state.productError = null
            state.products = payload
        },
        productFetchFailure: (state, action) => {
            state.productLoading = false;
            state.productError = action.payload;
        },
         productSuccess: (state) => {
            state.productLoading = false
            state.productError = null
            
        },

    }
})

export const { productFetchStart, productFetchSuccess, productFetchFailure,productSuccess } = productSlice.actions
export default productSlice.reducer