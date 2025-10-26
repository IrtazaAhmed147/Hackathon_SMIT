import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import reportSlice from './slices/reportSlice'
import vitalSlice from './slices/vitalSlice'
import aiSlice from './slices/aiSlice'
import familyMemberSlice from './slices/familyMemberSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        report: reportSlice,
        vital: vitalSlice,
        ai: aiSlice,
        familyMember: familyMemberSlice,
    }
})

export default store