import { MeetingType } from '@/constants/meeting'
import { EActionStatus, FetchError } from '../type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import serviceMeeting from '@/services/meeting'
import {
    IGetAllMeetingQuery,
    IMeeting,
    IMeetingState,
    ListParamsFilter,
} from './types'
import { AxiosError } from 'axios'
import { IGetAllDataReponse } from '@/services/response.type'

const initialState: IMeetingState = {
    status: EActionStatus.Idle,
    meetingFutureList: [],
    meetingPassList: [],
    page: 1,
    limit: 8,
    totalFutureMeetingItem: 0,
    totalPassMeetingItem: 0,
    filter: {
        searchQuery: '',
        sortOrder: 'ASC',
        sortField: 'startTime',
    },
    type: MeetingType.MEETING_FUTURE,
}

export const getAllMeetings = createAsyncThunk<
    IGetAllDataReponse<IMeeting> | undefined,
    { param: IGetAllMeetingQuery },
    {
        rejectValue: FetchError
    }
>('meeting/getFutureMeetingAll', async ({ param }, { rejectWithValue }) => {
    try {
        const { page, limit, type, filter } = param
        const data = await serviceMeeting.getAllMeetings({
            type,
            page,
            limit,
            filter: {...filter},
        })
        return data
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})

export const getAllPassMeetings = createAsyncThunk<
    IGetAllDataReponse<IMeeting> | undefined,
    { param: IGetAllMeetingQuery },
    {
        rejectValue: FetchError
    }
>('meeting/getPassMeetingAll', async ({ param }, { rejectWithValue }) => {
    try {
        const { page, limit, type, filter } = param
        const data = await serviceMeeting.getAllMeetings({
            type,
            page,
            limit,
            filter: {...filter},
        })
        return data
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})

const meetingListSlice = createSlice({
    name: 'meetingListSlice',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ListParamsFilter>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMeetings.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllMeetings.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.meetingFutureList = action.payload?.items ?? []
                state.totalFutureMeetingItem =
                    action.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllMeetings.rejected, (state) => {
                state.status = EActionStatus.Failed
            })
            .addCase(getAllPassMeetings.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllPassMeetings.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.meetingPassList = action.payload?.items ?? []
                state.totalPassMeetingItem =
                    action.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllPassMeetings.rejected, (state) => {
                state.status = EActionStatus.Failed
            })
    },
})

export const { setFilter } = meetingListSlice.actions

export default meetingListSlice.reducer
