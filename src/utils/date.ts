import moment from 'moment'

export const formatTimeMeeting = (
    meetings_start_time: string,
    meetings_end_time: string,
): string => {
    const meetings_start_timeMeeting = moment(meetings_start_time).utc(true)
    const meetings_end_timeMeeting = moment(meetings_end_time).utc(true)

    const timeMeeting1 = meetings_start_timeMeeting.format('HH:mm A')
    const timeMeeting2 = meetings_end_timeMeeting.format('HH:mm A')

    const timeRange = `${timeMeeting1} - ${timeMeeting2}`
    return timeRange
}

export const formatDate = (meetings_start_time: string, dateFormat: string): string => {
    return moment(meetings_start_time).utc(false).format(dateFormat)
}

export const statusDateMeeting = (
    meetings_start_time: string,
    meetings_end_time: string,
): boolean => {
    const meetings_start_timeMoment = moment(meetings_start_time).utc(true);
    const meetings_end_timeMoment = moment(meetings_end_time).utc(true);
    const currentTime = moment().utc(true).valueOf();

    const meetings_start_timeTimestampt = meetings_start_timeMoment.valueOf();
    const meetings_end_timeTimestampt = meetings_end_timeMoment.valueOf();
    
    if ( currentTime > meetings_start_timeTimestampt && currentTime < meetings_end_timeTimestampt  ) {
        return true;
    } else {
        return false;
    }
}
