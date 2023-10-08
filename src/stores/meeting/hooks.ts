import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { updateCreateMeetingInformation } from '@/stores/meeting/createSlice'
import { ICreateMeeting } from '@/stores/meeting/types'
import { useCallback } from 'react'

export function useCreateMeetingInformation(): [
    ICreateMeeting,
    // eslint-disable-next-line
    (data: ICreateMeeting) => void,
] {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state: RootState) => state.meetingCreate)

    const setCreateMeetingInformation = useCallback(
        (data: ICreateMeeting) => {
            dispatch(updateCreateMeetingInformation(data))
        },
        [dispatch],
    )

    return [data, setCreateMeetingInformation]
}
