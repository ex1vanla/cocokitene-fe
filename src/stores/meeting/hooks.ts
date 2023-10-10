import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import {
    resetCreateMeetingData,
    updateCreateMeetingInformation,
} from '@/stores/meeting/createSlice'
import { ICreateMeeting } from '@/stores/meeting/types'
import { useCallback } from 'react'

export function useCreateMeetingInformation(): [
    ICreateMeeting,
    // eslint-disable-next-line
    (data: ICreateMeeting) => void,
    () => void,
] {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state: RootState) => state.meetingCreate)

    const setCreateMeetingInformation = useCallback(
        (data: ICreateMeeting) => {
            dispatch(updateCreateMeetingInformation(data))
        },
        [dispatch],
    )

    const resetData = useCallback(() => {
        dispatch(resetCreateMeetingData())
    }, [dispatch])

    return [data, setCreateMeetingInformation, resetData]
}
