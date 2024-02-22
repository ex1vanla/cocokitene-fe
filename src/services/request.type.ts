import { MeetingStatus } from '@/constants/meeting'
import { IMeetingDocument, IMeetingResolution } from '@/stores/meeting/types'

export interface ICreateMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    meetingMinutes: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    hosts: number[]
    controlBoards: number[]
    directors: number[]
    administrativeCouncils: number[]
    shareholders: number[]
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
    hosts: number[]
    controlBoards: number[]
    directors: number[]
    administrativeCouncils: number[]
    shareholders: number[]
}

export interface IListMeetingPayload {}

export interface IGetAllDataRequest {
    page: number
    limit: number
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
    roleName: string;
    description?: string;
    idPermissions: number[]
}
