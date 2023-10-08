import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/stores/auth/slice'
import meetingCreateReducer from '@/stores/meeting/createSlice'
import meetingReducer from '@/stores/meetings/slice'
import attendanceReducer from '@/stores/attendance/slice'

const rootReducer = combineReducers({
    auth: authReducer,
    meeting: meetingReducer,
    meetingCreate: meetingCreateReducer,
    attendance: attendanceReducer
})

export default rootReducer
