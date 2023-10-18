import attendanceMeeting from '@/services/attendance'
import serviceMeeting from '@/services/meeting'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAttendanceMeeting } from './type'
import { FetchError } from '../type'
import { AxiosError } from 'axios'

export const joinMeeting = createAsyncThunk<
    IAttendanceMeeting,
    { meetingId: number },
    {
        rejectValue: FetchError
    }
>('attendance/joinMeeting', async ({ meetingId }, { rejectWithValue }) => {
    try {
        const data = await attendanceMeeting.attendanceMeeting(meetingId)
        return data
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})
