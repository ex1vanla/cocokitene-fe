/* eslint-disable */

import { useTranslations } from 'next-intl'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import { useState } from 'react'
import { FETCH_STATUS, urlRegex } from '@/constants/common'
import { useRouter } from 'next/navigation'
import { Button, notification, Spin } from 'antd'
import { ICreateBoardMeeting } from '@/stores/board-meeting/types'
import { ICreateBoardMeetingPayload } from '@/services/request.type'
import serviceBoardMeeting from '@/services/board-meeting'

const SaveCreateBoardMeetingButton = () => {
    const t = useTranslations()

    const [data, , resetData] = useCreateBoardMeetingInformation()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const router = useRouter()
    const onValidate = (data: ICreateBoardMeeting) => {
        const payload = {
            title: data.title,
            meetingLink:
                data.meetingLink && !data.meetingLink.startsWith('https://')
                    ? `https://${data.meetingLink}`
                    : data.meetingLink,
            startTime: data.startTime,
            endTime: data.endTime,
            endVotingTime: data.endVotingTime,
            note: data.note,
            meetingMinutes: data.meetingMinutes,
            meetingInvitations: data.meetingInvitations,
            // managementAndFinancials: data.managementAndFinancials.filter(
            //     (r) => r.title.trim() || r.description.trim(),
            // ),
            // elections: data.elections.filter(
            //     (r) => r.title.trim() || r.description.trim(),
            // ),
            // personnelVoting: data.candidates
            //     .filter((r) => r.title.trim() || r.candidateName.trim())
            //     .map((personnelVote) => ({
            //         title: personnelVote.title,
            //         type: personnelVote.type,
            //         candidate: [{ candidateName: personnelVote.candidateName }],
            //     })),
            managementAndFinancials: data.managementAndFinancials,
            elections: data.elections,
            personnelVoting: data.candidates.map((personnelVote) => ({
                title: personnelVote.title,
                type: personnelVote.type,
                candidate: [{ candidateName: personnelVote.candidateName }],
            })),
            participants: data.participants?.map((participant) => {
                return {
                    roleMtgId: participant.roleMtgId,
                    roleName: participant.roleName,
                    userIds: participant.userParticipant?.map(
                        (user) => user.users_id,
                    ),
                }
            }),
        }
        const rs: {
            isValid: boolean
            errors: { [key: string]: string }
            payload: ICreateBoardMeetingPayload
        } = {
            isValid: true,
            errors: {},
            payload,
        }

        if (!payload.title.trim()) {
            rs.isValid = false
            rs.errors.title = 'title'
        }
        if (!urlRegex.test(payload.meetingLink)) {
            rs.isValid = false
            rs.errors.meetingLink = 'meetingLink'
        }

        // if (payload.managementAndFinancials) {
        // }

        return rs
    }
    const validate = onValidate(data)
    const onSave = () => {
        if (!validate.isValid) {
            return
        }
        try {
            ;(async () => {
                setStatus(FETCH_STATUS.LOADING)
                console.log('validate.payload: ', validate.payload)

                const res = await serviceBoardMeeting.createBoardMeeting(
                    validate.payload,
                )
                notification.success({
                    message: t('CREATED'),
                    description: t('CREATE_BOARD_MEETING_SUCCESSFULLY'),
                    duration: 2,
                })
                resetData()
                setStatus(FETCH_STATUS.SUCCESS)
                router.push('/board-meeting')
            })()
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Something went wrong!',
                duration: 2,
            })
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    return (
        <Spin spinning={status === FETCH_STATUS.LOADING} delay={0}>
            <Button
                className="bg-primary text-white transition-opacity disabled:opacity-60"
                size="large"
                onClick={onSave}
                disabled={!validate.isValid || status === FETCH_STATUS.LOADING}
            >
                {t('SAVE')}
            </Button>
        </Spin>
    )
}
export default SaveCreateBoardMeetingButton
