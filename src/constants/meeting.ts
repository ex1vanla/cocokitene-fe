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

export enum FileType {
    PDF = 'PDF',
    EXCEL = 'EXCEL',
    WORD = 'WORD',
    LINK = 'LINK',
}

export enum MeetingFileType {
    MEETING_INVITATION = 'invitations',
    MEETING_MINUTES = 'minutes',
    REPORTS = 'reports',
}

export const ACCEPT_FILE_TYPES = '.xlsx,.xls,.doc,.docx,.pdf'
