import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/stores/auth/slice'
import meetingCreateReducer from '@/stores/meeting/createSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    meetingCreate: meetingCreateReducer,
})

export default rootReducer
