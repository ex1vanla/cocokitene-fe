import { MeetingType } from '@/constants/meeting'
import { EActionStatus } from '../type'
import { IParticipants } from '@/components/participant-selector'
import { ResolutionType } from '@/constants/resolution'

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

export interface IGetAllMeetingQuery {
    page: number
    limit: number
    type: MeetingType
    searchQuery?: string
    sortOrder?: string
}

export interface IMeetingState extends IGetAllMeetingQuery {
    status: EActionStatus
    meetingFutureList: IMeeting[]
    meetingPassList: IMeeting[]
    totalFutureMeetingItem: number
    totalPassMeetingItem: number
}
