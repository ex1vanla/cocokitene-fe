import { IMeetingDocument, IMeetingResolution } from '@/stores/meeting/types'

export interface ApiResponse<T = {}> {
    success: boolean
    code?: string | number
    content?: T
    message?: string
}

export type DataResponse<Data = null, Error = any> = [Data, Error]

export interface ICreateMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    meetingReports: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    hosts: number[]
    controlBoards: number[]
    directors: number[]
    administrativeCouncils: number[]
    shareholders: number[]
}
