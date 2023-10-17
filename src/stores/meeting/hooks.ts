import { IParticipants } from '@/components/participants-detail'
import { MeetingFileType } from '@/constants/meeting'
import { ResolutionType, VoteProposalResult } from '@/constants/resolution'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import {
    resetCreateMeetingData,
    updateCreateMeetingInformation,
} from '@/stores/meeting/createSlice'
import { getMeetingDetail } from '@/stores/meeting/detailSlice'
import {
    ICreateMeeting,
    IMeetingDetail,
    KeyRoles,
} from '@/stores/meeting/types'
import { EActionStatus } from '@/stores/type'
import { getFileTypeByUrl } from '@/utils/file'
import { MeetingResource } from '@/views/meeting/meeting-detail/documents'
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

export function useMeetingDetail(): [
    {
        meeting: IMeetingDetail | undefined
        status: EActionStatus
    },
    // eslint-disable-next-line
    (meetingId: number) => void,
] {
    const dispatch = useAppDispatch()
    const { meeting, status } = useAppSelector(
        (state: RootState) => state.meetingDetail,
    )

    const fetchMeetingDetail = useCallback(
        (meetingId: number) => {
            dispatch(getMeetingDetail(meetingId))
        },
        [dispatch],
    )

    return [
        {
            meeting,
            status,
        },
        fetchMeetingDetail,
    ]
}

export function useMeetingFiles(): {
    invitations: MeetingResource[]
    minutes: MeetingResource[]
} {
    const meeting = useAppSelector(
        (state: RootState) => state.meetingDetail.meeting,
    )

    if (!meeting)
        return {
            invitations: [],
            minutes: [],
        }

    const invitationsFile = meeting?.meetingFiles.filter(
        (file) => file.fileType === MeetingFileType.MEETING_INVITATION,
    )
    const minutesFile = meeting?.meetingFiles.filter(
        (file) => file.fileType === MeetingFileType.MEETING_MINUTES,
    )

    const invitations = invitationsFile.map((file) => ({
        url: file.url,
        type: getFileTypeByUrl(file.url),
    }))

    const minutes = minutesFile.map((file) => ({
        url: file.url,
        type: getFileTypeByUrl(file.url),
    }))

    return {
        invitations,
        minutes,
    }
}

export function useParticipants(): {
    hosts: IParticipants[]
    controlBoards: IParticipants[]
    directors: IParticipants[]
    administrativeCouncils: IParticipants[]
    shareholders: IParticipants[]
} {
    const meeting = useAppSelector(
        (state: RootState) => state.meetingDetail.meeting,
    )

    if (!meeting)
        return {
            hosts: [],
            controlBoards: [],
            directors: [],
            administrativeCouncils: [],
            shareholders: [],
        }

    const getParticipantsByRole = (role: KeyRoles) => {
        return meeting[role].map(
            (userMeeting) =>
                ({
                    defaultAvatarHashColor:
                        userMeeting.user.defaultAvatarHashColor,
                    avatar: userMeeting.user.avatar,
                    name: userMeeting.user.username,
                    joined:
                        userMeeting.status ===
                        UserMeetingStatusEnum.PARTICIPATE,
                }) as IParticipants,
        )
    }

    const hosts = getParticipantsByRole('hosts')
    const controlBoards = getParticipantsByRole('controlBoards')
    const directors = getParticipantsByRole('directors')
    const administrativeCouncils = getParticipantsByRole(
        'administrativeCouncils',
    )
    const shareholders = getParticipantsByRole('shareholders')

    return {
        hosts,
        controlBoards,
        directors,
        administrativeCouncils,
        shareholders,
    }
}

export function useResolutions(type: ResolutionType): {
    title: string
    content: string
    percentVoted: number
    voteResult: VoteProposalResult
}[] {
    const meeting = useAppSelector(
        (state: RootState) => state.meetingDetail.meeting,
    )

    if (!meeting) {
        return []
    }

    const resolutions = meeting?.proposals.filter(
        (proposal) => proposal.type === type,
    )

    return resolutions.map((resolution) => {
        const notVoteYetQuantity = Number(resolution.notVoteYetQuantity)
        const votedQuantity = Number(resolution.votedQuantity)
        const unVotedQuantity = Number(resolution.unVotedQuantity)
        const totalShareholders =
            notVoteYetQuantity + votedQuantity + unVotedQuantity

        const percentVoted =
            totalShareholders === 0
                ? 0
                : (votedQuantity * 100) / totalShareholders
        return {
            title: resolution.title,
            content: resolution.description,
            percentVoted,
            voteResult: resolution.voteResult,
        }
    })
}
