import moment from 'moment'

export const formatTime = (
    meetingsStartTime: string,
    meetingsEndTime: string,
    timeFormat: string,
): string => {
    const startTime = moment(meetingsStartTime).utc(true)
    const endTime = moment(meetingsEndTime).utc(true)

    const startTimeFormat = startTime.format(timeFormat)
    const endTimeFormat = endTime.format(timeFormat)

    const timeRange = `${startTimeFormat} - ${endTimeFormat}`
    return timeRange
}

export const formatDate = (startTime: string, dateFormat: string): string => {
    return moment(startTime).utc(false).format(dateFormat)
}

export const formatTimeMeeting = (
    meetingsStartTime: string,
    meetingsEndTime: string,
): string => {
    const startDate = moment(meetingsStartTime).utc(false).format('YYYY-MM-DD')
    const endDate = moment(meetingsEndTime).utc(false).format('YYYY-MM-DD')

    const startTime = moment(meetingsStartTime).utc(true).format('HH:mm')
    const endTime = moment(meetingsEndTime).utc(true).format('HH:mm')
    const timeRange = `${startDate} ${startTime} ~ ${endDate} ${endTime}`
    return timeRange
}

export const statusDateMeeting = (
    meetingsStartTime: string,
    meetingsEndTime: string,
): boolean => {
    const startTime = moment(meetingsStartTime).utc(true)
    const endTime = moment(meetingsEndTime).utc(true)
    const currentTime = moment().utc(true).valueOf()

    const startTimeTimestampt = startTime.valueOf()
    const endTimeTimestampt = endTime.valueOf()

    if (currentTime > startTimeTimestampt && currentTime < endTimeTimestampt) {
        return true
    } else {
        return false
    }
}

export const calculateTimeDifference = (
    meetingsStartTime: string,
): Number[] | false => {
    const startTime = moment(meetingsStartTime).utc(true)
    const currentTime = moment().utc(true).valueOf()

    const startTimeTimestampt = startTime.valueOf()

    if (startTimeTimestampt > currentTime) {
        const duration = moment.duration(startTime.diff(currentTime))
        const days = Math.floor(duration.asDays())
        const hours = duration.hours()
        const minutes = duration.minutes()
        return [days, hours, minutes]
    }
    return false
}

export const formatLocalDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng từ 0-11
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
}
