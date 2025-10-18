import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import reportSlice from './slices/reportSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        report: reportSlice,
    }
})

export default store