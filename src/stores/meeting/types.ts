<<<<<<< HEAD
import {
    MeetingFileType,
    MeetingStatus,
    MeetingType,
} from '@/constants/meeting'
=======
import { MeetingType } from '@/constants/meeting'
>>>>>>> ac433a9 (refactor: fix api login and meeting)
import { EActionStatus, FetchError } from '../type'
import { IParticipants } from '@/components/participant-selector'
import { ResolutionType, VoteProposalResult } from '@/constants/resolution'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'

export interface ICreateMeeting {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    meetingReports: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    hosts: IParticipants[]
    controlBoards: IParticipants[]
    directors: IParticipants[]
    administrativeCouncils: IParticipants[]
    shareholders: IParticipants[]
}

export interface IMeetingDocument {
    url: string
    fileType: string
}

export interface IMeetingResolution {
    title: string
    description: string
    type: ResolutionType
}

export interface IMeeting {
    meetings_id: number
    meetings_title: string
    meetings_start_time: string
    meetings_end_time: string
    meetings_meeting_link: string
    isJoined: string
    meetings_status_meeting_happen: string
}

export interface ListParamsFilter{
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}

export interface IGetAllMeetingQuery {
    page: number
    limit: number
    type: MeetingType
    filter?: ListParamsFilter
}

export interface IMeetingState extends IGetAllMeetingQuery, FetchError {
    status: EActionStatus
    meetingFutureList: IMeeting[]
    meetingPassList: IMeeting[]
    totalFutureMeetingItem: number
    totalPassMeetingItem: number
}

export interface IMeetingFile {
    id: number
    url: string
    meetingId: number
    fileType: MeetingFileType
}

export interface IProposal {
    id: number
    title: string
    description: string
    type: ResolutionType
    votedQuantity: number | null
    unVotedQuantity: number | null
    notVoteYetQuantity: number | null
    voteResult: VoteProposalResult
    meetingId: number
    creatorId: number
}

export interface IUserMeeting {
    id: number
    status: UserMeetingStatusEnum
    user: {
        id: number
        username: string
        email: string
        avatar: string | null
        defaultAvatarHashColor: string | null
    }
}

export interface IMeetingDetail {
    id: number
    title: string
    startTime: string
    endTime: string
    meetingLink: string
    status: MeetingStatus
    companyId: number
    creatorId: number
    meetingFiles: IMeetingFile[]
    proposals: IProposal[]
    hosts: IUserMeeting[]
    controlBoards: IUserMeeting[]
    directors: IUserMeeting[]
    administrativeCouncils: IUserMeeting[]
    shareholders: IUserMeeting[]
    shareholdersTotal: number
    shareholdersJoined: number
    votedMeetingShares: number
    totalMeetingShares: number
}

export type KeyRoles =
    | 'hosts'
    | 'controlBoards'
    | 'directors'
    | 'administrativeCouncils'
    | 'shareholders'

export interface IDetailMeetingState {
    status: EActionStatus
    meeting: IMeetingDetail | undefined
    error: FetchError | undefined
}
