/*eslint-disable*/
import { FETCH_STATUS, urlRegex } from '@/constants/common'
import serviceMeeting from '@/services/meeting'
import { IUpdateMeetingPayload } from '@/services/request.type'
import { useUpdateMeetingInformation } from '@/stores/meeting/hooks'
import { IUpdateMeeting } from '@/stores/meeting/types'
import { Button, Spin, notification } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SaveUpdateMeetingButton = () => {
    const t = useTranslations()
    const [data] = useUpdateMeetingInformation()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const router = useRouter()

    const onValidate = (data: IUpdateMeeting) => {
        const payload = {
            ...data,
            meetingLink:
                data.meetingLink && !data.meetingLink.startsWith('https://')
                    ? `https://${data.meetingLink}`
                    : data.meetingLink,
            hosts: data.hosts.map((i) => i.users_id),
            controlBoards: data.controlBoards.map((i) => i.users_id),
            shareholders: data.shareholders.map((i) => i.users_id),
            directors: data.directors.map((i) => i.users_id),
            administrativeCouncils: data.administrativeCouncils.map(
                (i) => i.users_id,
            ),
            resolutions: data.resolutions.filter(
                (r) => r.title.trim() || r.description.trim(),
            ),
            amendmentResolutions: data.amendmentResolutions.filter(
                (r) => r.title.trim() || r.description.trim(),
            ),
        }

        const rs: {
            isValid: boolean
            errors: { [key: string]: string }
            payload: IUpdateMeetingPayload
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

        // if (
        //     payload.resolutions.length + payload.amendmentResolutions.length ===
        //     0
        // ) {
        //     rs.isValid = false
        //     rs.errors.resolution = 'resolution'
        // }

        // if (payload.amendmentResolutions.length === 0) {
        //     rs.isValid = false
        //     rs.errors.amendmentResolutions = 'amendmentResolutions'
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
                await serviceMeeting.updateMeeting(data.id, validate.payload)
                notification.success({
                    message: t('UPDATED'),
                    description: t('UPDATED_MEETING_SUCCESSFULLY'),
                })
                setStatus(FETCH_STATUS.SUCCESS)
                router.push(`/meeting/detail/${data.id}`)
            })()
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Something went wrong!',
            })
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    return (
        <Spin spinning={status === FETCH_STATUS.LOADING} delay={0}>
            <Button
                type="default"
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

export default SaveUpdateMeetingButton
