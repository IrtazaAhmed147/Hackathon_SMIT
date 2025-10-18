import api from '../../utils/common.js'
import { vitalFetchFailure, vitalFetchStart, vitalFetchSuccess, vitalSuccess } from '../slices/vitalSlice.js'

const token = localStorage.getItem("token")
export const createVital = (form) => async (dispatch) => {
    console.log(form);
    console.log(token);

    try {

        dispatch(vitalFetchStart())

        const res = await api.post('/vital/create', form, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        console.log(res);

        if (res.data.success) {
            dispatch(vitalSuccess())
        }
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(vitalFetchFailure(error.message))
    }
}

export const getVitals = () => async (dispatch) => {
    try {
        console.log('cladfadf');
        
        dispatch(vitalFetchStart())
        const res = await api.get('/vital/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        })
        console.log(res);

        if (res.data.success) {
            dispatch(vitalFetchSuccess(res.data.data))
        }
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(vitalFetchFailure(error.message))
    }
} 