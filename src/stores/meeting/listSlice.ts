import { MeetingType } from "@/constants/meeting"
import { EActionStatus } from "../type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import serviceMeeting from "@/services/meeting"
import { IGetAllMeetingQuery, IMeetingState } from "./types"

const initialState: IMeetingState = {
    status: EActionStatus.Idle,
    meetingFutureList: [],
    meetingPassList: [],
    page: 1,
    limit: 8,
    totalFutureMeetingItem: 0,
    totalPassMeetingItem: 0,
    searchQuery: '',
    sortOrder: 'ASC',
    type: MeetingType.MEETING_FUTURE,
}

export const getAllMeetings = createAsyncThunk(
    'meeting/getFutureMeetingAll',
    async (action: IGetAllMeetingQuery) => {
        const { page, limit, type, searchQuery, sortOrder } = action
        const data = await serviceMeeting.getAllMeetings({
            type,
            page,
            limit,
            searchQuery,
            sortOrder,
        })
        return data
    },
)

export const getAllPassMeetings = createAsyncThunk(
    'meeting/getPassMeetingAll',
    async (action: IGetAllMeetingQuery) => {
        const { page, limit, type, searchQuery, sortOrder } = action
        const data = await serviceMeeting.getAllMeetings({
            type,
            page,
            limit,
            searchQuery,
            sortOrder,
        })
        return data
    },
)

const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMeetings.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllMeetings.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.meetingFutureList = action.payload?.items ?? []
                state.totalFutureMeetingItem =
                    action.payload?.meta.totalItems ?? 0
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
                    action.payload?.meta.totalItems ?? 0
            })
            .addCase(getAllPassMeetings.rejected, (state) => {
                state.status = EActionStatus.Failed
            })
    },
})

export default meetingSlice.reducer