import { IParticipants } from '@/components/participant-selector'
import { IParticipantsView } from '@/components/participants-detail'
import { MeetingFileType, MeetingStatus } from '@/constants/meeting'
import { ResolutionType, VoteProposalOption } from '@/constants/resolution'
import { UserStatus } from '@/constants/user-status'
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

export interface IProposalCreatorResponse {
    username: string
    email: string
    avatar: string | null
    defaultAvatarHashColor: string | null
}

export interface IProposalFileResponse {
    id: number
    url: string
}

export interface IProposalResponse {
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
    creator: IProposalCreatorResponse
    proposalFiles: IProposalFileResponse[]
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
    note: string
    startTime: string
    endTime: string
    endVotingTime: string
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
    joinedMeetingShares: number
    totalMeetingShares: number
}

export interface IVoteProposalResult {
    result: VoteProposalOption
    userId: number
    proposalId: number
    deletedAt: null | string
    id: number
}

export interface IMeetingParticipantsResponse {
    hosts: IParticipantsView[]
    controlBoards: IParticipantsView[]
    directors: IParticipantsView[]
    shareholders: IParticipantsView[]
    administrativeCouncils: IParticipantsView[]
}

export interface IPlanResponse {
    id: number
    planName: string
    description: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
}

export interface IUserStatusResponse {
    id: number
    status: UserStatus
    description: string
}

export interface IListCompanyResponse {
    companys_id: number
    companys_company_name: string
    planName: string
    companys_representative_user: string
    totalCreatedAccount: string
    totalCreatedMTGs: string
    companyStatus: string
}

export interface IUserResponse {
    id: number
    username: string
    email: string
    walletAddress: string
    avatar: string
    statusId: number
    companyId: number
    shareQuantity: number
    nonce: string
    defaultAvatarHashColor: string | null
    phone: string | null
    activeTime: string | null
    userStatus: IUserStatusResponse
}

export interface IRoleResponse {
    id: number
    roleName: string
    description: string
}
export interface IListAccountResponse {
    id: number
    username: string
    walletAddress: string
    avatar: string
    companyId: number
    defaultAvatarHashColor: string | null
    userStatus: IUserStatusResponse
    userRole: IRoleResponse[]
}

export interface ICompanyDetailResponse {
    id: number
    companyName: string
    companyShortName: string
    description?: string
    address: string
    planId: number
    statusId: number
    representativeUser: string
    phone: string
    taxNumber: string
    email: string
    fax?: string
    dateOfCorporation: string
    businessType: string
    companyStatus: ICompanyStatusResponse
    superAdminInfo: IUserResponse
    servicePlan: IPlanResponse
}
