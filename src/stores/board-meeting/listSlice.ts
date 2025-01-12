import {
    IGetAllMeetingQuery,
    IMeeting,
    IMeetingState,
    ListParamsFilter,
} from '@/stores/meeting/types'
import { EActionStatus, FetchError } from '@/stores/type'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { MeetingTime, MeetingType, SORT, SortField } from '@/constants/meeting'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetAllDataAllowControlResponse } from '@/services/response.type'
import { AxiosError } from 'axios/index'
import serviceBoardMeeting from '@/services/board-meeting'

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
    meetingType: MeetingType.BOARD_MEETING,
}

export const getAllBoardMeetings = createAsyncThunk<
    IGetAllDataAllowControlResponse<IMeeting>,
    IGetAllMeetingQuery,
    {
        rejectValue: FetchError
    }
>(
    'boardMeeting/getFutureBoardMeetingAll',
    async (param, { rejectWithValue }) => {
        try {
            const data = await serviceBoardMeeting.getAllMeetings(param)
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
    },
)

export const getAllPassBoardMeetings = createAsyncThunk<
    IGetAllDataAllowControlResponse<IMeeting>,
    IGetAllMeetingQuery,
    {
        rejectValue: FetchError
    }
>('boardMeeting/getPassBoardMeetingAll', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceBoardMeeting.getAllMeetings(param)
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

const boardMeetingListSlice = createSlice({
    name: 'boardMeetingListSlice',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ListParamsFilter>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBoardMeetings.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllBoardMeetings.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.meetingFutureList = action.payload?.items ?? []
                state.allowCreate = action.payload.allowCreate
                state.totalFutureMeetingItem =
                    action.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllBoardMeetings.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action.payload?.errorCode ?? ''
                state.errorMessage = action.payload?.errorMessage ?? ''
            })
            .addCase(getAllPassBoardMeetings.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllPassBoardMeetings.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.meetingPassList = action.payload?.items ?? []
                state.allowCreate = action.payload.allowCreate
                state.totalPassMeetingItem =
                    action.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllPassBoardMeetings.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action.payload?.errorCode ?? ''
                state.errorMessage = action.payload?.errorMessage ?? ''
            })
    },
})

export const { setFilter } = boardMeetingListSlice.actions

export default boardMeetingListSlice.reducer
