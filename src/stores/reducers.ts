import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/stores/auth/slice'
import meetingCreateReducer from '@/stores/meeting/createSlice'
import meetingListReducer from '@/stores/meeting/listSlice'
import meetingDetailReducer from '@/stores/meeting/detailSlice'
import meetingUpdateReducer from '@/stores/meeting/updateSlice'
import attendanceReducer from '@/stores/attendance/slice'
import companyListReducer from '@/stores/company/listSlice'
import companyDetailReducer from '@/stores/company/detailSlice'
import authAdminReducer from '@/stores/auth-admin/slice'

const rootReducer = combineReducers({
    auth: authReducer,
    meetingList: meetingListReducer,
    meetingCreate: meetingCreateReducer,
    meetingDetail: meetingDetailReducer,
    meetingUpdate: meetingUpdateReducer,
    attendance: attendanceReducer,
    companyList: companyListReducer,
    companyDetail: companyDetailReducer,
    authAdmin: authAdminReducer,
})

export default rootReducer
