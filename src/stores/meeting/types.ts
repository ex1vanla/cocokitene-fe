export interface ICreateMeeting {
    title: string;
    meetingLink: string;
    startTime: string;
    endTime: string;
    meetingReports: MeetingReport[];
    meetingInvitations: MeetingInvitation[];
    resolutions: IMeetingResolution[];
    amendmentResolutions: IMeetingResolution[];
    hosts: number[];
    controlBoards: number[];
    directors: number[];
    administrativeCouncils: number[];
    shareholders: number[];
}


interface MeetingReport {
    url: string;
    fileType: string;
}

interface MeetingInvitation {
    url: string;
    fileType: string;
}

export interface IMeetingResolution {
    title: string;
    description: string;
    type: string;
}