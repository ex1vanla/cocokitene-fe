import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { IAttendanceState } from './type'
import { joinMeeting } from './thunk'

type AttendanceType = {
    attendanceState: IAttendanceState
    joinMeetingAction: (meetingId: number) => void
}

export const useAttendance = (): AttendanceType => {
    const dispatch = useAppDispatch()
    const attendanceState = useAppSelector(
        (state: RootState) => state.attendance,
    )

    const joinMeetingAction = useCallback(
        (meetingId: number) => {
            dispatch(joinMeeting({ meetingId }))
        },
        [dispatch],
    )

    return { attendanceState, joinMeetingAction }
}
