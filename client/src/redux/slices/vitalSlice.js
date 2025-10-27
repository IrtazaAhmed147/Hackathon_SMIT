import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    vitals: [],
    vital: {},
    vitalLoading: false,
    vitalError: false,
}
const vitalSlice = createSlice({
    name: 'vital',
    initialState,
    reducers: {
        vitalFetchStart: (state) => {
            state.vitalLoading = true
            state.vitalError = null

        },
        vitalFetchSuccess: (state, { payload }) => {
            state.vitalLoading = false
            state.vitalError = null
            state.vitals = payload
        },
        singleVitalFetchSuccess: (state, { payload }) => {
            state.vitalLoading = false
            state.vitalError = null
            state.vital = payload
        },
        vitalFetchFailure: (state, action) => {
            state.vitalLoading = false;
            state.vitalError = action.payload;
        },
        vitalSuccess: (state) => {
            state.vitalLoading = false
            state.vitalError = null

        }, 
        
        resetVitals: (state) => {
            state.vitals = [];
            state.vital = {};
            state.vitalLoading = false;
            state.vitalError = null;
        },
        clearVital: (state) => {
            state.vital = {};
            state.vitalLoading = false;
            state.vitalError = null;
        },

    }
})

export const { vitalFetchStart, vitalFetchSuccess, vitalFetchFailure, vitalSuccess, resetVitals ,clearVital,singleVitalFetchSuccess} = vitalSlice.actions
export default vitalSlice.reducer