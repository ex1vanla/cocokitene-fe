import { MeetingType } from "@/constants/meeting"
import { EActionStatus } from "../type"

export interface ICreateMeeting {
    title: string
    link: string
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
    totalPassMeetingItem : number
}