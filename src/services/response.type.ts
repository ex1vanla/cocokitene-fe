import { IParticipants } from '@/components/participant-selector'
import {
    MeetingFileType,
    MeetingStatus,
    ResolutionType,
} from '@/constants/meeting'
import { VoteProposalResult } from '@/constants/resolution'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'

export interface IMeta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

export interface IGetAllDataReponse<T> {
    items: T[]
    meta: IMeta
}

export interface ApiResponse<T = {}> {
    code: string | number
    data: T
    metadata: {
        timestamp: Date
        query: unknown
    }
}

export interface IUploadResponse {
    uploadUrls: string[]
}

export interface IAccountListResponse {
    items: IParticipants[]
    meta: IMeta
}

export interface IMeetingFileResponse {
    id: number
    url: string
    meetingId: number
    fileType: MeetingFileType
}

export interface IProposalResponse {
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

export interface IUserMeetingResponse {
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

export interface IMeetingDetailResponse {
    id: number
    title: string
    startTime: string
    endTime: string
    meetingLink: string
    status: MeetingStatus
    companyId: number
    creatorId: number
    meetingFiles: IMeetingFileResponse[]
    proposals: IProposalResponse[]
    hosts: IUserMeetingResponse[]
    controlBoards: IUserMeetingResponse[]
    directors: IUserMeetingResponse[]
    administrativeCouncils: IUserMeetingResponse[]
    shareholders: IUserMeetingResponse[]
    shareholdersTotal: number
    shareholdersJoined: number
    votedMeetingShares: number
    totalMeetingShares: number
}
