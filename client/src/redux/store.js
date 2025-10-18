import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import reportSlice from './slices/reportSlice'
import vitalSlice from './slices/vitalSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        report: reportSlice,
        vital: vitalSlice,
    }
})

export default store