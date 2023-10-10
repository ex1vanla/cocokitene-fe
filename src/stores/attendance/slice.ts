import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EActionStatus } from '../type'
import { joinAttendanceMeeting } from './thunk'
import { IAttendanceState } from './type'

const initialState: IAttendanceState = {
    status: EActionStatus.Idle,
    statusMeeting: null,
    meetingIdJoin: null
}

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        setMeetingIdJoin: (state: IAttendanceState, action: PayloadAction<{ meetingId: number }>) => {
            state.meetingIdJoin = action.payload.meetingId;
        },
        resetStatusMeeting: (state: IAttendanceState, _: PayloadAction<{ meetingId: number }>) => {
            state.statusMeeting = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                joinAttendanceMeeting.pending,
                (state: IAttendanceState) => {
                    state.status = EActionStatus.Pending
                    state.statusMeeting = null
                },
            )
            .addCase(
                joinAttendanceMeeting.fulfilled,
                (state: IAttendanceState, action) => {
                    state.status = EActionStatus.Succeeded
                    state.statusMeeting = action.payload;
                },
            )
            .addCase(
                joinAttendanceMeeting.rejected,
                (state: IAttendanceState) => {
                    state.status = EActionStatus.Failed
                },
            )
    },
})

export const { setMeetingIdJoin, resetStatusMeeting } = attendanceSlice.actions;

export default attendanceSlice.reducer