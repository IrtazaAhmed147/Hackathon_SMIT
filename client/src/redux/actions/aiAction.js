import api from '../../utils/common.js'
import { aiFetchFailure, aiFetchStart, aiFetchSuccess, aiSuccess } from '../slices/aiSlice';



const token = localStorage.getItem("token")


export const analyzeReport = (id) => async (dispatch) => {
    try {
        dispatch(aiFetchStart())
        console.log("analyze reports");
        
        const res = await api.post(`/ai/analyze/${id}`, {},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        })
        console.log(res);

        if (res.data.success) {
            dispatch(aiSuccess())
        }
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(aiFetchFailure(error.message))
    }
}


export const getSingleAiInsights = (id) => async (dispatch) => {
    try {
        dispatch(aiFetchStart())
        const res = await api.get(`/ai/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        })
        console.log(res);

        if (res.data.success) {
            dispatch(aiFetchSuccess(res.data.data))
        }
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(aiFetchFailure(error.message))
    }
}