import moment from 'moment'

export const formatTimeMeeting = (
    startTime: string,
    endTime: string,
): string => {
    // Định dạng thời gian
    const startTimeMeeting = moment(startTime).utc(false)
    const endTimeMeeting = moment(endTime).utc(false)

    const timeMeeting1 = startTimeMeeting.format('HH:mm A')
    const timeMeeting2 = endTimeMeeting.format('HH:mm A')

    const timeRange = `${timeMeeting1} - ${timeMeeting2}`
    return timeRange
}

export const formatDate = (startTime: string, dateFormat: string): string => {
    return moment(startTime).utc(false).format(dateFormat)
}

export const statusDateMeeting = (
    startTime: string,
    endTime: string,
): boolean => {
    
    const startTimeMoment = moment(startTime).utc(false);
    const endTimeMoment = moment(endTime).utc(false);
    
    const currentTime = moment().utc(true).valueOf();
    const startTimeTimestampt = startTimeMoment.valueOf();
    const endTimeTimestampt = endTimeMoment.valueOf();
    
    if ( currentTime > startTimeTimestampt && currentTime < endTimeTimestampt  ) {
        return true;
    } else {
        return false;
    }
}
