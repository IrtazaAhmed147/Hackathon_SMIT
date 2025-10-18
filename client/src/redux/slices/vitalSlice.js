import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    vitals: [],
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
        vitalFetchFailure: (state, action) => {
            state.vitalLoading = false;
            state.vitalError = action.payload;
        },
         vitalSuccess: (state) => {
            state.vitalLoading = false
            state.vitalError = null
            
        },

    }
})

export const { vitalFetchStart, vitalFetchSuccess, vitalFetchFailure,vitalSuccess , isPdfModal,
  closePdfModal,} = vitalSlice.actions
export default vitalSlice.reducer