import attendanceMeeting from "@/services/attendance"
import serviceMeeting from "@/services/meeting"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const joinAttendanceMeeting = createAsyncThunk(
    'attendance/joinMeeting',
    async (meetingId: number) => {
        const data = await attendanceMeeting.attendanceMeeting(
            meetingId
        )
        return data
    },
)