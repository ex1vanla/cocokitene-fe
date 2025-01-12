import { IParticipants } from '@/components/participant-selector'
import { IParticipantsView } from '@/components/participants-detail'
import {
    MeetingFileType,
    MeetingStatus,
    MeetingType,
} from '@/constants/meeting'
import { ResolutionType, VoteProposalOption } from '@/constants/resolution'
import { UserStatus } from '@/constants/user-status'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import { ICompanyStatusResponse } from './system-admin/response.type'
import { ElectionEnum } from '@/constants/election'
import { TypeRoleMeeting } from '@/constants/role-mtg'
import {
    PaymentMethod,
    StatusSubscriptionEnum,
    SubscriptionEnum,
} from '@/constants/service-subscript'

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

export interface IGetAllDataAllowControlResponse<T> {
    items: T[]
    allowCreate: boolean
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

export interface IBoardMeetingFileResponse {
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

export interface IBoardMeetingProposalResponse {
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

export interface ICandidateResponse {
    id: number
    // title: string
    candidateName: string
    personnelVotingId: number
    // type: ElectionEnum
    // type: number
    votedQuantity: number | null
    unVotedQuantity: number | null
    notVoteYetQuantity: number | null
    voteResult: VoteProposalOption
    votedQuantityShare: number | null
    // meetingId: number
    creatorId: number
}

export interface IPersonnelVoting {
    id: number
    title: string
    type: number
    meetingId: number
    creatorId: number
    candidate: ICandidateResponse[]
    typeElection: IElectionResponse
}

// export interface IUserMeetingResponse {
//     id: number
//     status: UserMeetingStatusEnum
//     user: {
//         id: number
//         username: string
//         email: string
//         avatar: string | null
//         defaultAvatarHashColor: string | null
//     }
// }
export interface IRoleMtgDetailResponse {
    id: number
    roleName: string
    description: string
    type: TypeRoleMeeting
}

export interface IMeetingDetailResponse {
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
    meetingFiles: IMeetingFileResponse[]
    proposals: IProposalResponse[]
    personnelVoting: IPersonnelVoting[]
    participants: ParticipantDetailMeetingResponse[]
    shareholdersTotal: number
    shareholdersJoined: number
    joinedMeetingShares: number
    totalMeetingShares: number
    chatPermissionId: number
}

export interface IBoardMeetingDetailResponse {
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
    meetingFiles: IBoardMeetingFileResponse[]
    proposals: IBoardMeetingProposalResponse[]
    personnelVoting: IPersonnelVoting[]
    participants: ParticipantDetailMeetingResponse[]
    boardsTotal: number
    boardsJoined: number
    chatPermissionId: number
}

export interface ParticipantDetailMeetingResponse {
    roleMtgId: number
    roleMtgName: string
    userParticipants: IUserMeetingResponse[]
}
export interface IUserMeetingResponse {
    id: number
    status: UserMeetingStatusEnum

    userId: number
    userEmail: string
    userAvatar: string | null
    userShareQuantity: number | null
    userDefaultAvatarHashColor: string | null
}

export interface IVoteProposalResult {
    result: VoteProposalOption
    userId: number
    proposalId: number
    deletedAt: null | string
    id: number
}

export interface IBoardMeetingParticipantsResponse {
    userWithRoleMtg: IParticipantWithRoleMtg[]
}
export interface IMeetingParticipantsResponse {
    userWithRoleMtg: IParticipantWithRoleMtg[]
}

export interface IParticipantWithRoleMtg {
    roleMtgId: number
    roleMtgName: string
    userParticipants: IParticipantsView[]
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

export interface IElectionResponse {
    id: number
    status: ElectionEnum
    description: string
}

export interface IReactionIconResponse {
    id: number
    key: string
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
    users_id: number
    users_username: string
    users_wallet_address: string
    users_email: string
    users_avartar: string
    users_company_id: number
    users_defaultAvatarHashColor: string | null
    userStatus_id: number
    userStatus_status: string
    userStatus_description: string
    listRoleResponse: string
}

export interface IListRoleMtgResponse {
    id: number
    roleName: string
    description: string
    type: TypeRoleMeeting
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

export interface IUserRole {
    id: number
    roleName: string
    description: string
}
export interface IUserRoleResponse {
    id: number
    roleName: string
    description: string
}
export interface IAccountDetailResponse {
    username: string
    email: string
    walletAddress: string
    shareQuantity: number
    phone: string
    avatar: string
    defaultAvatarHashColor: string | null
    company: {
        companyName: string
        id: number
    }
    userStatus: IUserStatusResponse
    roles: IUserRole[]
}
export interface ICreateAccountPayload {
    email: string
    username: string
    walletAddress?: string | null
    shareQuantity?: number | null
    phone: string
    roleIds: number[]
    statusId: number
    avatar?: string | null
}

export interface IListShareholderResponse {
    users_id: number
    users_username: string
    users_email: string
    users_wallet_address: string
    users_avartar: string | null
    users_company_id: number
    users_share_quantity: number
    users_defaultAvatarHashColor: string | null
    userStatus_status: IUserStatusResponse
    listRoleResponse: string
}

export interface IShareholderDetailResponse {
    username: string
    email: string
    walletAddress: string
    phone: string
    avatar: string
    shareQuantity: number
    defaultAvatarHashColor: string | null
    company: {
        companyName: string
        id: number
    }
    userStatus: IUserStatusResponse
    roles: IUserRole[]
}

export interface IUpdateShareholderPayload {
    email: string
    username: string
    walletAddress?: string | null
    shareQuantity?: number | null
    phone: string
    roleIds: number[]
    statusId: number
    avatar?: string | null
}
export interface IUpdateProfile {
    email: string
    username: string
    walletAddress?: string | null
    phone: string
    avatar?: string
}
export interface IPermissionResponse {
    id: number
    key: string
    description?: string
}

export interface IRoleMtgResponse {
    id: number
    roleName: string
    description: string
}

//Type Chat Meeting

export interface ReactionIconResponse {
    id: number
    key: string
}

export interface ReactionMessage {
    id: number
    userId: number
    messageId: number
    emoji: ReactionIconResponse
}
export interface userChatInfo {
    id: number
    email: string
}

export interface replyMessageInfo {
    id: number
    senderId: userChatInfo
    receiverId: userChatInfo
    content: string
}
export interface DataMessageChat {
    id: number
    sender: userChatInfo
    receiver: userChatInfo
    content: string
    createdAt: string
    replyMessage?: replyMessageInfo
    reactions?: ReactionMessage[]
}

export interface IAllMeetingChatInMeetingResponse {
    roomChat: number
    messageChat: DataMessageChat[]
}

export interface IPermissionChatResponse {
    id: number
    name: string
    description?: string
}

export interface IUpdatePermissionChat {
    permissionChatId: number
}

export interface ILastMessageSeen {
    id: number
    userId: number
    meetingId: number
    lastMessageIdSeen: number
}

export interface IUpdateLastMessageSeen {
    lastMessageIdSeen: number
}
export interface IDataHashMeeting {
    id: number
    basicInformationMeetingHash: string
    fileMeetingHash: string
    proposalMeetingHash: string
    votedProposalHash: string
    candidateHash: string
    votedCandidateHash: string
    participantHash: string
    detailMeetingHash: string
}

export interface IStatisticMeetingInMonth {
    totalMeeting: number
    totalParticipant: number
    totalParticipantJoined: number
}

export interface IStatisticMeetingInMonthResponse {
    shareholderMeetingInMonth: IStatisticMeetingInMonth
    boardMeetingInMonth: IStatisticMeetingInMonth
}

export interface ISystemNotificationResponse {
    system_notification_id: number
    system_notification_title: string
    system_notification_content: string
    system_notification_created_at: string
    system_notification_updated_at: string
    creator_id: number
    creator_username: string
    creator_email: string
    updater_id: number | null
    updater_username: string | null
    updater_email: string | null
}

export interface ISysNotificationListResponse {
    items: ISystemNotificationResponse[]
    meta: IMeta
}

export interface IMeetingInMonthResponse {
    meetings_id: number
    meetings_start_time: string
    meetings_end_time: string
    meetings_company_id: number
    meetings_type: MeetingType
}

export interface IServicePlanOfCompany {
    id: number
    companyId: number
    planId: number
    meetingLimit: number
    meetingCreated: number
    accountLimit: number
    accountCreated: number
    storageLimit: number
    storageUsed: number
    expirationDate: string
    createdAt: string
    createdSystemId?: number
    updatedAt: string
    updatedSystemId?: number
    plan: {
        id: number
        planName: string
        description: string
        price: number
    }
    company: {
        id: number
        companyName: string
        companyShortName: string
        planId: number
        statusId: number
    }
}

export interface IServiceSubscription {
    service_subscription_id: number
    service_subscription_type: SubscriptionEnum
    service_subscription_total_free: number
    service_subscription_status: StatusSubscriptionEnum
    planName: string
    company_id: number
    payment_method: PaymentMethod
    approval_time: string
    activation_date: string
    expiration_date: string
}
