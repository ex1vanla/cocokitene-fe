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

export interface ICreateCompanyPayload {
    companyName: string
    description?: string
    address: string
    companyShortName: string
    email: string
    dateOfCorporation: string
    phone: string
    fax?: string
    taxNumber: string
    businessType: string
    representativeUser: string
    statusId: number
    planId: number
    superAdminCompany: {
        username: string
        walletAddress: string
        email: string
        statusId: number
    }
}

export interface IUpdateCompanyPayload {
    companyName: string
    description?: string
    address: string
    companyShortName: string
    email: string
    dateOfCorporation: string
    phone: string
    fax?: string
    taxNumber: string
    businessType: string
    representativeUser: string
    statusId: number
    planId: number
}

export interface IUpdateSuperAdminPayload {
    username: string
    walletAddress: string
    email: string
    statusId: number
}
