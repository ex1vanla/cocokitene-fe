import { useBoardMeetingDetail, useReports } from '@/stores/board-meeting/hook'
import { useTranslations } from 'next-intl'
import { ResolutionType } from '@/constants/resolution'
import { useAuthLogin } from '@/stores/auth/hooks'
import BoxArea from '@/components/box-area'
import { useMemo } from 'react'
import { IBoardMeetingDetail } from '@/stores/board-meeting/types'
import { RoleMtgEnum } from '@/constants/role-mtg'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import { titleTooltipShow } from '@/constants/board-meeting'
import { Empty } from 'antd'
import DetailReportItem from '@/components/detail-report-item'

const ManagementAndFinancialReports = () => {
    const managementFinancials = useReports(ResolutionType.MANAGEMENT_FINANCIAL)

    const [{ boardMeeting }] = useBoardMeetingDetail()
    const t = useTranslations()
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

    const body = useMemo(() => {
        if (managementFinancials.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        marginBlock: 0,
                    }}
                />
            )
        }

        return managementFinancials.map((resolution, index) => (
            <DetailReportItem
                id={resolution.id}
                key={index}
                index={index + 1}
                title={resolution.title}
                content={resolution.description}
                creator={resolution.creator}
                proposalFiles={resolution.proposalFiles}
                voteErrorMessage={notifiEnableVote}
                isBoard={false}
            />
        ))
    }, [managementFinancials, notifiEnableVote])

    return (
        <BoxArea title={t('MANAGEMENT_AND_FINANCIAL_REPORTS')}>
            <div className="mb-6 flex flex-col gap-6">{body}</div>
        </BoxArea>
    )
}

export default ManagementAndFinancialReports
