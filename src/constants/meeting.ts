/* eslint-disable */

export enum ResolutionType {
    RESOLUTION = 'resolution',
    AMENDMENT_RESOLUTION = 'amendment_resolution',
}

export enum MeetingResourceType {
    MEETING_INVITATIONS = 'MEETING_INVITATIONS',
    MEETING_MINUTES = 'MEETING_MINUTES',
    MEETING_LINKS = 'MEETING_LINKS',
}

export enum MeetingType {
    MEETING_FUTURE = 'future',
    MEETING_PASS = 'pass',
}

export enum MeetingStatus {
    MEETING_FUTURE = 'Future',
    MEETING_IN_PROGRESS = 'In Progress',
}

export enum FileType {
    PDF = 'PDF',
    EXCEL = 'EXCEL',
    WORD = 'WORD',
    LINK = 'LINK',
}

export enum SORT {
    ASC = 'ASC',
    DESC = 'DESC',
}
export enum MeetingFileType {
    MEETING_INVITATION = 'invitations',
    MEETING_MINUTES = 'minutes',
    REPORTS = 'reports',
}

export const ACCEPT_FILE_TYPES = '.xlsx,.xls,.doc,.docx,.pdf'
