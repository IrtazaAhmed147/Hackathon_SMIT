import api from '../../utils/common.js'
import { productFetchFailure, productFetchStart, productFetchSuccess, productSuccess } from '../slices/productSlice.js'

export const createProduct = (form) => async (dispatch) => {
    console.log(form);

    try {

        dispatch(productFetchStart())

        const res = await api.post('/product/create', form, {
            withCredentials: true
        })
        console.log(res);

        if (res.data.success) {
            dispatch(productSuccess())
        }
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(productFetchFailure(error.message))
    }
}

export const getProducts = () => async (dispatch) => {
    try {
        dispatch(productFetchStart())
        const res = await api.get('/product', {
            withCredentials: true
        })
        console.log(res);

        if (res.data.success) {
            dispatch(productFetchSuccess(res.data.data))
        }
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(productFetchFailure(error.message))
    }
} 