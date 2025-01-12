import { MeetingTime, MeetingType, SORT, SortField } from '@/constants/meeting'
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
import { IGetAllDataAllowControlResponse } from '@/services/response.type'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'

const initialState: IMeetingState = {
    status: EActionStatus.Idle,
    meetingFutureList: [],
    meetingPassList: [],
    allowCreate: true,
    page: 1,
    limit: 4,
    totalFutureMeetingItem: 0,
    totalPassMeetingItem: 0,
    filter: {
        searchQuery: CONSTANT_EMPTY_STRING,
        sortOrder: SORT.DESC,
        sortField: SortField.START_TIME,
    },
    type: MeetingTime.MEETING_FUTURE,
    errorCode: '',
    errorMessage: '',
    meetingType: MeetingType.SHAREHOLDER_MEETING,
}

export const getAllMeetings = createAsyncThunk<
    IGetAllDataAllowControlResponse<IMeeting>,
    IGetAllMeetingQuery,
    {
        rejectValue: FetchError
    }
>('meeting/getFutureMeetingAll', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceMeeting.getAllMeetings(param)
        return {
            ...data,
            items: data.meetings.items,
            meta: data.meetings.meta,
            allowCreate: data.allowCreate,
        } as unknown as IGetAllDataAllowControlResponse<IMeeting>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

export const getAllPassMeetings = createAsyncThunk<
    IGetAllDataAllowControlResponse<IMeeting>,
    IGetAllMeetingQuery,
    {
        rejectValue: FetchError
    }
>('meeting/getPassMeetingAll', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceMeeting.getAllMeetings(param)
        return {
            ...data,
            items: data.meetings.items,
            meta: data.meetings.meta,
            allowCreate: data.allowCreate,
        } as unknown as IGetAllDataAllowControlResponse<IMeeting>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
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
                state.allowCreate = action.payload.allowCreate
                state.totalFutureMeetingItem =
                    action.payload?.meta.totalItems ?? 0
            })
            .addCase(getAllMeetings.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action.payload?.errorCode ?? ''
                state.errorMessage = action.payload?.errorMessage ?? ''
            })
            .addCase(getAllPassMeetings.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllPassMeetings.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.meetingPassList = action.payload?.items ?? []
                state.allowCreate = action.payload.allowCreate
                state.totalPassMeetingItem =
                    action.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllPassMeetings.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action.payload?.errorCode ?? ''
                state.errorMessage = action.payload?.errorMessage ?? ''
            })
    },
})

export const { setFilter } = meetingListSlice.actions

export default meetingListSlice.reducer
