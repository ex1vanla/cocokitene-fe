import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { EActionStatus, FetchError } from '../type'
import { IDetailMeetingState, IMeetingDetail } from './types'
import serviceMeeting from '@/services/meeting'

const initialState: IDetailMeetingState = {
    status: EActionStatus.Idle,
    meeting: undefined,
    error: undefined,
}

export const getMeetingDetail = createAsyncThunk<
    IMeetingDetail,
    number,
    {
        rejectValue: FetchError
    }
>('meeting/getFutureMeetingAll', async (meetingId, { rejectWithValue }) => {
    try {
        const meetingDetail = await serviceMeeting.getDetailMeeting(meetingId)

        return {
            id: meetingDetail.id,
            title: meetingDetail.title,
            startTime: meetingDetail.startTime,
            endTime: meetingDetail.endTime,
            meetingLink: meetingDetail.meetingLink,
            status: meetingDetail.status,
            companyId: meetingDetail.companyId,
            creatorId: meetingDetail.creatorId,
            meetingFiles: meetingDetail.meetingFiles,
            proposals: meetingDetail.proposals,
            hosts: meetingDetail.hosts,
            controlBoards: meetingDetail.controlBoards,
            directors: meetingDetail.directors,
            administrativeCouncils: meetingDetail.administrativeCouncils,
            shareholders: meetingDetail.shareholders,
            shareholdersTotal: meetingDetail.shareholdersTotal,
            shareholdersJoined: meetingDetail.shareholdersJoined,
            votedMeetingShares: meetingDetail.votedMeetingShares,
            totalMeetingShares: meetingDetail.totalMeetingShares,
        } as IMeetingDetail
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})

const meetingDetailSlice = createSlice({
    name: 'meetingDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMeetingDetail.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getMeetingDetail.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.meeting = action.payload
            })
            .addCase(getMeetingDetail.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action.payload
            })
    },
})

export default meetingDetailSlice.reducer