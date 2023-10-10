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
