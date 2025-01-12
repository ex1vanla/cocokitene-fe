import {
    IBoardMeetingDetail,
    IBoardMeetingDetailState,
} from '@/stores/board-meeting/types'
import { EActionStatus, FetchError } from '@/stores/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import serviceBoardMeeting from '@/services/board-meeting'

const initialState: IBoardMeetingDetailState = {
    status: EActionStatus.Idle,
    boardMeeting: undefined,
    error: undefined,
}

export const getBoardMeetingDetail = createAsyncThunk<
    IBoardMeetingDetail,
    number,
    { rejectValue: FetchError }
>(
    'boardMeeting/getBoardMeetingDetail',
    async (boardMeetingId, { rejectWithValue }) => {
        try {
            const boardMeetingDetail =
                await serviceBoardMeeting.getDetailBoardMeeting(boardMeetingId)
            return {
                id: boardMeetingDetail.id,
                title: boardMeetingDetail.title,
                note: boardMeetingDetail.note,
                meetingLink: boardMeetingDetail.meetingLink,
                meetingCode: boardMeetingDetail.meetingCode,
                startTime: boardMeetingDetail.startTime,
                endTime: boardMeetingDetail.endTime,
                endVotingTime: boardMeetingDetail.endVotingTime,
                status: boardMeetingDetail.status,
                companyId: boardMeetingDetail.companyId,
                creatorId: boardMeetingDetail.creatorId,
                meetingFiles: boardMeetingDetail.meetingFiles.map((meetingFile) =>({
                    ...meetingFile,
                    url: meetingFile.url ? process.env.NEXT_PUBLIC_PRE_URL_S3_LINK + meetingFile.url :  meetingFile.url,
                })),
                proposals: boardMeetingDetail.proposals.map((proposal) => ({
                    ...proposal,
                    proposalFiles: proposal.proposalFiles.map((file) => ({
                        ...file,
                        url: file.url ? process.env.NEXT_PUBLIC_PRE_URL_S3_LINK + file.url : file.url
                    }))
                })),
                type: boardMeetingDetail.type,
                participants: boardMeetingDetail.participants,
                candidates: boardMeetingDetail.personnelVoting,
                boardsTotal: boardMeetingDetail.boardsTotal,
                boardsJoined: boardMeetingDetail.boardsJoined,
                chatPermissionId: boardMeetingDetail.chatPermissionId,
            } as unknown as IBoardMeetingDetail
        } catch (error) {
            const err = error as AxiosError
            const response: any = err.response?.data
            return rejectWithValue({
                errorMessage: response?.message,
                errorCode: response?.code,
            })
        }
    },
)

const boardMeetingDetailSlice = createSlice({
    name: 'boardMeetingDetailSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = EActionStatus.Idle
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBoardMeetingDetail.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getBoardMeetingDetail.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.boardMeeting = action.payload
            })
            .addCase(getBoardMeetingDetail.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action.payload
            })
    },
})

export const { resetStatus } = boardMeetingDetailSlice.actions
export default boardMeetingDetailSlice.reducer
