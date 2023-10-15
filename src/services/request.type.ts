import { IMeetingDocument, IMeetingResolution } from '@/stores/meeting/types'

export interface ICreateMeetingPayload {
    title: string
    meetings_meeting_link: string
    meetings_start_time: string
    meetings_end_time: string
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
