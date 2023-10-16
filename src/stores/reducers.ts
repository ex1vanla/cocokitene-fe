import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/stores/auth/slice'
import meetingCreateReducer from '@/stores/meeting/createSlice'
import meetingListReducer from '@/stores/meeting/listSlice'
import meetingDetailReducer from '@/stores/meeting/detailSlice'
import attendanceReducer from '@/stores/attendance/slice'

const rootReducer = combineReducers({
    auth: authReducer,
    meetingList: meetingListReducer,
    meetingCreate: meetingCreateReducer,
    meetingDetail: meetingDetailReducer,
    attendance: attendanceReducer,
})

export default rootReducer