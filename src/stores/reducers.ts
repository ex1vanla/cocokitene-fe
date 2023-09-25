import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/stores/auth/slice'
import meetingReducer from '@/stores/meetings/slice'

const rootReducer = combineReducers({
    auth: authReducer,
    meeting: meetingReducer,
})

export default rootReducer
