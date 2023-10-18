<<<<<<< HEAD
/* eslint-disable */

import { EActionStatus } from '../type'

export interface IAttendanceState {
    status: EActionStatus
    statusMeeting: any
    meetingIdJoin: number | null
}

export interface IAttendanceMeeting {
    userJoinMeetingStatus: UserMeetingStatusEnum
=======
import { EActionStatus, FetchError } from "../type";

export interface IAttendanceState extends FetchError {
    status: EActionStatus;
    meetingIdJoin: number | null;
}

export interface IAttendanceMeeting {
    meetingId: number;
>>>>>>> ac433a9 (refactor: fix api login and meeting)
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
