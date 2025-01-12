import {
    IBoardMeetingReportRedux,
    ICreateBoardMeeting,
} from '@/stores/board-meeting/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ICreateBoardMeeting = {
    title: '',
    meetingLink: '',
    note: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    endVotingTime: new Date().toISOString(),
    meetingMinutes: [],
    meetingInvitations: [],
    managementAndFinancials: [
        // {
        //     title: '',
        //     description: '',
        //     oldDescription: '',
        //     files: [],
        //     type: ResolutionType.MANAGEMENT_FINANCIAL,
        // },
    ],
    elections: [
        // {
        //     title: '',
        //     description: '',
        //     oldDescription: '',
        //     files: [],
        //     type: ResolutionType.ELECTION,
        // },
    ],
    personnelVoting: {
        confidence: [],
        notConfidence: [],
    },
    participants: [],
}

export const boardMeetingCreateSlice = createSlice({
    name: 'boardMeetingCreateSlice',
    initialState,
    reducers: {
        updateCreateBoardMeetingInformation: (
            state: ICreateBoardMeeting,
            action: PayloadAction<ICreateBoardMeeting>,
        ) => {
            state.title = action.payload.title
            state.meetingLink = action.payload.meetingLink
            state.startTime = action.payload.startTime
            state.endTime = action.payload.endTime
            state.endVotingTime = action.payload.endVotingTime
            state.note = action.payload.note
            state.meetingMinutes = action.payload.meetingMinutes
            state.meetingInvitations = action.payload.meetingInvitations
            state.managementAndFinancials =
                action.payload.managementAndFinancials
            state.elections = action.payload.elections
            state.personnelVoting = action.payload.personnelVoting
            // state.hosts = action.payload.hosts
            // state.controlBoards = action.payload.controlBoards
            // state.directors = action.payload.directors
            // state.administrativeCouncils = action.payload.administrativeCouncils
            state.participants = action.payload.participants
        },
        updateCreateBoardMeetingReport: (
            state: ICreateBoardMeeting,
            action: PayloadAction<{
                data: IBoardMeetingReportRedux
                index: number
            }>,
        ) => {
            state.managementAndFinancials[action.payload.index] =
                action.payload.data
        },

        resetCreateBoardMeetingData: () => {
            return initialState
        },
    },
})
export const {
    updateCreateBoardMeetingInformation,
    updateCreateBoardMeetingReport,
    resetCreateBoardMeetingData,
} = boardMeetingCreateSlice.actions

export default boardMeetingCreateSlice.reducer
