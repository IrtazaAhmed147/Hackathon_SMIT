import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    aiInsight: {},
    aiLoading: false,
    aiError: false,
}
const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        aiFetchStart: (state) => {
            state.aiLoading = true
            state.aiError = null

        },
        aiFetchSuccess: (state, { payload }) => {
            state.aiLoading = false
            state.aiError = null
            state.aiInsight = payload
        },
        aiFetchFailure: (state, action) => {
            state.aiLoading = false;
            state.aiError = action.payload;
        },
         aiSuccess: (state) => {
            state.aiLoading = false
            state.aiError = null
            
        },

         resetAi: (state) => {
            state.aiInsight = {};
            state.aiLoading = false;
            state.aiError = null;
        },
  

    }
})

export const { aiFetchStart, aiFetchSuccess, aiFetchFailure,aiSuccess,resetAi } = aiSlice.actions
export default aiSlice.reducer