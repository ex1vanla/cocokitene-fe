import { EActionStatus } from "../type";

export interface IAttendanceState {
    status: EActionStatus;
    statusMeeting: any;
    meetingIdJoin: number | null;
}

export interface IAttendanceMeeting {
    userJoinMeetingStatus: UserMeetingStatusEnum;
}

export enum UserMeetingStatusEnum {
    PARTICIPATE = 'participate',
    ABSENCE = 'absence',
}

export enum MeetingRole {
    HOST = 'host',
    CONTROL_BOARD = 'control_board',
    DIRECTOR = 'director',
    ADMINISTRATIVE_COUNCIL = 'administrative_council',
    SHAREHOLDER = 'shareholder',
}