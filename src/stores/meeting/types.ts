import {
    MeetingFileType,
    MeetingStatus,
    MeetingTime,
    MeetingType,
} from '@/constants/meeting'
import { EActionStatus, FetchError } from '../type'
import { IParticipantsWithRole } from '@/components/participant-selector'
import { ResolutionType, VoteProposalOption } from '@/constants/resolution'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import { IPersonnelVoting } from '@/services/response.type'

import { RcFile } from 'antd/es/upload'

export interface ICreateMeeting {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    endVotingTime: string
    note: string
    meetingMinutes: IMeetingFileDocument[]
    // meetingInvitations: IMeetingDocument[]
    meetingInvitations: IMeetingFileDocument[]
    resolutions: IMeetingResolutionRedux[]
    amendmentResolutions: IMeetingResolutionRedux[]
    personnelVoting: IMeetingExecutive
    participants: IParticipantsWithRole[]
}

export interface IMeetingDocument {
    id?: number
    uid?: string
    url: string
    fileType: string
}

export interface IMeetingFileDocument {
    id?: number
    uid?: string
    file: string | Blob | RcFile
    fileType: MeetingFileType
}

export interface IProposalFile {
    id?: number
    uid?: string
    url: string
}

export interface IProposalFileMeeting {
    id?: number
    uid?: string
    file: string | Blob | RcFile
}

export interface IMeetingResolutionRedux {
    id?: number
    title: string
    description: string
    oldDescription?: string
    files?: IProposalFileMeeting[]
    type: ResolutionType
}

export interface IMeetingResolution {
    id?: number
    title: string
    description: string
    oldDescription?: string
    files?: IProposalFile[]
    type: ResolutionType
}

export interface IMeeting {
    meetings_id: number
    meetings_title: string
    meetings_start_time: string
    meetings_note: string
    meetings_end_time: string
    meetings_meeting_link: string
    isJoined: number
    meetings_status: string
    transaction_contract_address?: string
    transaction_key_query?: string
    isParticipant: number
}

export interface ListParamsFilter {
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}

export interface IGetAllMeetingQuery {
    page: number
    limit: number
    type: MeetingTime
    filter?: ListParamsFilter
    meetingType: MeetingType
}

export interface IMeetingState extends IGetAllMeetingQuery, FetchError {
    status: EActionStatus
    meetingFutureList: IMeeting[]
    meetingPassList: IMeeting[]
    allowCreate: boolean
    totalFutureMeetingItem: number
    totalPassMeetingItem: number
}

export interface IMeetingFile {
    id: number
    url: string
    meetingId: number
    fileType: MeetingFileType
}

export interface IProposalCreator {
    username: string
    email: string
    avatar: string | null
    defaultAvatarHashColor: string | null
}

export interface IProposal {
    id: number
    title: string
    description: string
    oldDescription?: string
    type: ResolutionType
    votedQuantity: number | null
    unVotedQuantity: number | null
    notVoteYetQuantity: number | null
    voteResult: VoteProposalOption
    meetingId: number
    creator: IProposalCreator
    proposalFiles: IProposalFile[]
}

export interface IBoardProposal {
    id: number
    title: string
    description: string
    oldDescription?: string
    type: ResolutionType
    votedQuantity: number | null
    unVotedQuantity: number | null
    notVoteYetQuantity: number | null
    voteResult: VoteProposalOption
    meetingId: number
}

// export interface IUserMeeting {
//     id: number
//     status: UserMeetingStatusEnum
//     user: {
//         id: number
//         username: string
//         email: string
//         avatar: string | null
//         shareQuantity: number | null
//         defaultAvatarHashColor: string | null
//     }
// }

export interface IUserMeeting {
    id: number
    status: UserMeetingStatusEnum

    userId: number
    userEmail: string
    userAvatar: string | null
    userShareQuantity: number | null
    userDefaultAvatarHashColor: string | null
}

export interface IMeetingDetail {
    id: number
    title: string
    note: string
    startTime: string
    endTime: string
    endVotingTime: string
    meetingLink: string
    meetingCode: string
    status: MeetingStatus
    companyId: number
    creatorId: number
    type: MeetingType
    meetingFiles: IMeetingFile[]
    proposals: IProposal[]
    personnelVoting: IPersonnelVoting[]
    participants: ParticipantDetailMeeting[]
    shareholdersTotal: number
    shareholdersJoined: number
    joinedMeetingShares: number
    totalMeetingShares: number
    chatPermissionId: number
}

export interface ParticipantDetailMeeting {
    roleMtgId: number
    roleMtgName: string
    userParticipants: IUserMeeting[]
}
//
// export type KeyRoles =
//     | 'hosts'
//     | 'controlBoards'
//     | 'directors'
//     | 'administrativeCouncils'
//     | 'shareholders'

export interface IDetailMeetingState {
    status: EActionStatus
    meeting: IMeetingDetail | undefined
    error: FetchError | undefined
}

export interface IUpdateMeeting {
    id: number
    title: string
    note: string
    status: MeetingStatus
    meetingLink: string
    meetingCode: string
    startTime: string
    endTime: string
    endVotingTime: string
    meetingMinutes: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    personnelVoting: IMeetingExecutive
    participants: IParticipantsWithRole[]
}

export interface IUpdateMeetingState {
    status: EActionStatus
    meeting: IUpdateMeeting
    error: FetchError | undefined
}

export interface IMeetingExecutive {
    confidence: IMeetingPersonnelVote[]
    notConfidence: IMeetingPersonnelVote[]
}
export interface IMeetingPersonnelVote {
    title: string
    type: number
    candidate: {
        candidateID?: number
        candidateName: string
    }[]
}

export interface IResolution {
    title: string
    content: string
    oldContent?: string
    percentVoted: number
    percentUnVoted: number
    percentNotVoteYet: number
    voteResult: VoteProposalOption
    creator: IProposalCreator
    id: number
    proposalFiles: IProposalFile[]
}
