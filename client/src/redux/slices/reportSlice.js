import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    reports: [],
    reportLoading: false,
    reportError: false,
    pdfModal: false
}
const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        reportFetchStart: (state) => {
            state.reportLoading = true
            state.reportError = null

        },
        reportFetchSuccess: (state, { payload }) => {
            state.reportLoading = false
            state.reportError = null
            state.reports = payload
        },
        reportFetchFailure: (state, action) => {
            state.reportLoading = false;
            state.reportError = action.payload;
        },
         reportSuccess: (state) => {
            state.reportLoading = false
            state.reportError = null
            
        },
        isPdfModal: (state)=> {
            state.pdfModal = !state.pdfModal
        }

    }
})

export const { reportFetchStart, reportFetchSuccess, reportFetchFailure,reportSuccess ,isPdfModal} = reportSlice.actions
export default reportSlice.reducer