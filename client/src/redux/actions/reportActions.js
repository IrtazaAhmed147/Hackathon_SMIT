import api from '../../utils/common.js'
import { reportFetchFailure, reportFetchStart, reportFetchSuccess, reportSuccess } from '../slices/reportSlice.js'

const token = localStorage.getItem("token")
export const createReport = (form) => async (dispatch) => {
    console.log(form);
    console.log(token);

    try {

        dispatch(reportFetchStart())

        const res = await api.post('/report/create', form, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        })
        console.log(res);

        if (res.data.success) {
            dispatch(reportSuccess())
        }
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(reportFetchFailure(error.message))
    }
}

export const getReports = () => async (dispatch) => {
    try {
        dispatch(reportFetchStart())
        const res = await api.get('/report', {
            withCredentials: true
        })
        console.log(res);

        if (res.data.success) {
            dispatch(reportFetchSuccess(res.data.data))
        }
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(reportFetchFailure(error.message))
    }
} 