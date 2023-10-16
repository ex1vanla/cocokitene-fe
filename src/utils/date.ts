import moment from 'moment'

export const formatTimeMeeting = (
    meetingsStartTime: string,
    meetingsEndTime: string,
): string => {
    const startTime = moment(meetingsStartTime).utc(true)
    const endTime = moment(meetingsEndTime).utc(true)

    const startTimeFormat = startTime.format('HH:mm A')
    const endTimeFormat = endTime.format('HH:mm A')

    const timeRange = `${startTimeFormat} - ${endTimeFormat}`
    return timeRange
}

export const formatDate = (startTime: string, dateFormat: string): string => {
    return moment(startTime).utc(false).format(dateFormat)
}

export const statusDateMeeting = (
    meetingsStartTime: string,
    meetingsEndTime: string,
): boolean => {
    const startTime = moment(meetingsStartTime).utc(true);
    const endTime = moment(meetingsEndTime).utc(true);
    const currentTime = moment().utc(true).valueOf();

    const startTimeTimestampt = startTime.valueOf();
    const endTimeTimestampt = endTime.valueOf();
    
    if ( currentTime > startTimeTimestampt && currentTime < endTimeTimestampt  ) {
        return true;
    } else {
        return false;
    }
}
