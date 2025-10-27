import api from '../../utils/common.js'
import { reportFetchFailure, reportFetchStart, reportFetchSuccess, reportSuccess, reportUploadFailure } from '../slices/reportSlice.js'

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
        console.log(res);
        
        return res.data.data.id
    } catch (error) {
      if(error?.response?.data) {

        console.log(error.response.data.message);
        
        dispatch(reportUploadFailure(error.response.data.message))
        throw error.response.data.message
      }
    }
}

export const getReports = () => async (dispatch) => {
    try {
        dispatch(reportFetchStart())
        const res = await api.get('/report', {
                        headers: {
                Authorization: `Bearer ${token}`,
                          },
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



export const getFamilyMemberReports = (memberId) => async (dispatch) => {
  try {
    dispatch(reportFetchStart());

    const res = await api.get(`/report/family/${memberId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(reportFetchSuccess(res.data.data));
    }
    return res.data.message;
  } catch (error) {
    console.error("Get family member reports error:", error);
    dispatch(reportFetchFailure(error.message));
  }
};


export const deleteReport = (id) => async (dispatch) => {
  try {
    dispatch(reportFetchStart());

    const res = await api.delete(`/report/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(reportSuccess());
    }
    return res.data.message;
  } catch (error) {
    console.error("error:", error);
    dispatch(reportFetchFailure(error.message));
  }
};