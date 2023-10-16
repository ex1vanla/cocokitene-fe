/*eslint-disable*/
import { FETCH_STATUS, urlRegex } from '@/constants/common'
import serviceMeeting from '@/services/meeting'
import { ICreateMeetingPayload } from '@/services/request.type'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import { ICreateMeeting } from '@/stores/meeting/types'
import { Button, Spin, notification } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SaveCreateMeetingButton = () => {
    const t = useTranslations()
    const [data, , resetData] = useCreateMeetingInformation()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const router = useRouter()

    const onValidate = (data: ICreateMeeting) => {
        const payload = {
            ...data,
            meetingLink:
                data.meetingLink && !data.meetingLink.startsWith('https://')
                    ? `https://${data.meetingLink}`
                    : data.meetingLink,
            hosts: data.hosts.map((i) => i.id),
            controlBoards: data.controlBoards.map((i) => i.id),
            shareholders: data.shareholders.map((i) => i.id),
            directors: data.directors.map((i) => i.id),
            administrativeCouncils: data.administrativeCouncils.map(
                (i) => i.id,
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
            payload: ICreateMeetingPayload
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

        if (payload.resolutions.length === 0) {
            rs.isValid = false
            rs.errors.resolution = 'resolution'
        }
        if (payload.amendmentResolutions.length === 0) {
            rs.isValid = false
            rs.errors.amendmentResolutions = 'amendmentResolutions'
        }

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
                const res = await serviceMeeting.createMeeting(validate.payload)
                notification.success({
                    message: 'Created',
                    description: 'Create meeting successfully!',
                })

                resetData()

                setStatus(FETCH_STATUS.SUCCESS)
                router.push('/meeting')
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

export default SaveCreateMeetingButton