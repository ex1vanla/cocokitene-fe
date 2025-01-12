import { MeetingStatus } from '@/constants/meeting'
import { IMeetingDocument, IMeetingFileDocument, IMeetingPersonnelVote, IMeetingResolution, IMeetingResolutionRedux } from '@/stores/meeting/types'
import {
    IBoardMeetingDocument,
    IBoardMeetingFileDocument,
    IBoardMeetingReport,
} from '@/stores/board-meeting/types'
import { TypeRoleMeeting } from '@/constants/role-mtg'
import { VoteProposalOption } from '@/constants/resolution'
import { PaymentMethod, SubscriptionEnum } from '@/constants/service-subscript'

export interface ICreateMeetingPayload {
    title: string
    meetingLink: string
    meetingCode: string
    startTime: string
    endTime: string
    meetingMinutes: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    personnelVoting: IMeetingPersonnelVote[]
    participants: IParticipantPayload[]
}

export interface ISaveCreateMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    meetingMinutes: IMeetingFileDocument[]
    meetingInvitations: IMeetingFileDocument[]
    resolutions: IMeetingResolutionRedux[]
    amendmentResolutions: IMeetingResolutionRedux[]
    personnelVoting: IMeetingPersonnelVote[]
    participants: IParticipantPayload[]
}


export interface IParticipantPayload {
    roleMtgId: number
    roleName: string
    userIds: number[]
}

export interface ICreateRoleMtgPayload {
    roleName: string
    description?: string
    type: TypeRoleMeeting
}

export interface IUpdateRoleMtgPayload extends ICreateRoleMtgPayload {}

export interface ICreateBoardMeetingPayload {
    title: string
    meetingLink: string
    meetingCode: string
    startTime: string
    endTime: string
    endVotingTime: string
    meetingMinutes: IBoardMeetingDocument[]
    meetingInvitations: IBoardMeetingDocument[]
    managementAndFinancials: IBoardMeetingReport[]
    elections: IBoardMeetingReport[]
    personnelVoting: IMeetingPersonnelVote[]
    participants: IParticipantPayload[]
}

export interface ISaveCreateBoardMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    endVotingTime: string
    meetingMinutes: IBoardMeetingFileDocument[]
    meetingInvitations: IBoardMeetingFileDocument[]
    managementAndFinancials: IMeetingResolutionRedux[]
    elections: IMeetingResolutionRedux[]
    personnelVoting: IMeetingPersonnelVote[]
    participants: IParticipantPayload[]
}


export interface IUpdateMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    status: MeetingStatus
    meetingMinutes: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    personnelVoting: IMeetingPersonnelVote[]
    participants: IParticipantPayload[]
}

export interface IListMeetingPayload {}

export interface IGetAllDataRequest {
    page: number
    limit: number
}
export interface IGetAllRoleMtgByTypeRequest extends IGetAllDataRequest {
    type?: TypeRoleMeeting
}

export interface ICreateAccountPayload {
    email: string
    username: string
    walletAddress: string
    shareQuantity?: number
    phone: string
    roleIds: number[]
    statusId: number
    avatar?: string
}

export interface IUpdatePermissionRole {
    permissionId: number
    changeStatePermissionForRole: RoleChecked[]
}

type RoleChecked = {
    roleId: number
    state: number
}

export interface ICreateRolePayload {
    roleName: string
    description?: string
    idPermissions: number[]
}

export interface IUpdateBoardMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    status: MeetingStatus
    meetingMinutes: IBoardMeetingDocument[]
    meetingInvitations: IBoardMeetingDocument[]
    managementAndFinancials: IBoardMeetingReport[]
    elections: IBoardMeetingReport[]
    personnelVoting: {
        id?: number
        title: string
        type?: number
        candidate: {
            id?: number
            candidateName: string
        }[]
    }[]
    participants: IParticipantPayload[]
}

//Chat-Meeting
export interface ICreateReactionMessagePayload {
    messageId: number
    reactionIconId: number
}

//Vote Candidate in PersonnelVoting
export interface IVotedCandidateInPersonnel {
    candidate:{
        id: number
        result: VoteProposalOption,
        quantityShare: number| null,
    }[]
}

export interface IGetAllMeetingInDayPayload {
    page: number
    limit: number,
    date: Date
}

export interface ISystemNotification {
    title: string,
    content: string,
}

export interface ISubscriptionServicePlanPayload {
    companyId: number
    planId: number
    amount: number
    type: SubscriptionEnum
    paymentMethod: PaymentMethod
    activationDate: string
    expirationDate: string
    note?: string
    transferReceipt?:string
}
 
