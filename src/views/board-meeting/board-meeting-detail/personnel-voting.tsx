/* eslint-disable */

import BoxArea from '@/components/box-area'
import { useTranslations } from 'next-intl'
import { useBoardMeetingDetail } from '@/stores/board-meeting/hook'
import { useAuthLogin } from '@/stores/auth/hooks'
import { IBoardMeetingDetail } from '@/stores/board-meeting/types'
import { RoleMtgEnum } from '@/constants/role-mtg'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import { useMemo } from 'react'
import { titleTooltipShow } from '@/constants/board-meeting'
import { Empty } from 'antd'
import { ElectionEnum } from '@/constants/election'
import { MeetingType } from '@/constants/meeting'
import DetailPersonnelVotingItem from '@/components/detail-personnel-voting'

const PersonnelVoting = () => {
    const t = useTranslations()
    const [{ boardMeeting }] = useBoardMeetingDetail()

    const { authState } = useAuthLogin()
    const checkParticipantIsBoardAndStatusParticipant = (
        boardMeeting: IBoardMeetingDetail,
    ): boolean => {
        return boardMeeting.participants.some((item) => {
            if (item.roleMtgName !== RoleMtgEnum.HOST) {
                return item.userParticipants.some(
                    (option) =>
                        option.userId === authState.userData?.id &&
                        option.status === UserMeetingStatusEnum.PARTICIPATE,
                )
            }
            return false
        })
    }
    const notifiEnableVote = useMemo(() => {
        let message: string = ''
        if (boardMeeting) {
            const time = new Date().getTime()
            const startTime = new Date(boardMeeting.startTime).getTime()
            const endVotingTime = new Date(boardMeeting.endVotingTime).getTime()
            if (time < startTime || time > endVotingTime) {
                message += titleTooltipShow.votingTime
            }
            const isParticipantBoardJoined =
                checkParticipantIsBoardAndStatusParticipant(boardMeeting)
            if (isParticipantBoardJoined == false) {
                message += message
                    ? `_,_${titleTooltipShow.participant}`
                    : titleTooltipShow.participant
            }
        }
        return message
        // eslint-disable-next-line
    }, [boardMeeting, authState])
    const appointMents = boardMeeting?.candidates
        ?.filter(
            (item) =>
                item.typeElection.status === ElectionEnum.VOTE_OF_CONFIDENCE,
        )
        .sort((a, b) => a.id - b.id)
    const dismissals = boardMeeting?.candidates
        ?.filter(
            (item) =>
                item.typeElection.status ===
                ElectionEnum.VOTE_OF_NOT_CONFIDENCE,
        )
        .sort((a, b) => a.id - b.id)
    const bodyDismissals = useMemo(() => {
        if (dismissals?.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        marginBlock: 0,
                    }}
                />
            )
        }
        // return dismissals?.map((candidate, index) => {
        return dismissals?.map((personnelVoting, index) => {
            return (
                <DetailPersonnelVotingItem
                    key={personnelVoting.id}
                    index={index}
                    title={personnelVoting.title}
                    candidate={personnelVoting.candidate}
                    voteErrorMessage={notifiEnableVote}
                    meetingType={
                        boardMeeting?.type ?? MeetingType.BOARD_MEETING
                    }
                />
            )
        })
    }, [notifiEnableVote, appointMents])

    const bodyAppontMents = useMemo(() => {
        if (appointMents?.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        marginBlock: 0,
                    }}
                />
            )
        }
        return appointMents?.map((personnelVoting, index) => {
            return (
                <DetailPersonnelVotingItem
                    key={personnelVoting.id}
                    index={index}
                    title={personnelVoting.title}
                    candidate={personnelVoting.candidate}
                    voteErrorMessage={notifiEnableVote}
                    meetingType={
                        boardMeeting?.type ?? MeetingType.BOARD_MEETING
                    }
                />
            )
        })
    }, [notifiEnableVote, appointMents])

    return (
        <BoxArea title={t('EXECUTIVE_OFFICER_ELECTION')}>
            <BoxArea title={t('APPOINTMENT')}>
                <div className="mb-6 flex flex-col gap-6">
                    {bodyAppontMents}
                </div>
            </BoxArea>

            <BoxArea title={t('DISMISSAL')}>
                <div className="mb-6 flex flex-col gap-6">{bodyDismissals}</div>
            </BoxArea>
        </BoxArea>
    )
}

export default PersonnelVoting
