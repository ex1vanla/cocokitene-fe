import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useAttendance } from '@/stores/attendance/hooks'
import { useNotification } from '@/hooks/use-notification'
import { Button, Col, Modal, Row, Tooltip, Typography } from 'antd'
import { calculateTimeDifference, formatTimeMeeting } from '@/utils/date'
import Image from 'next/image'
import { truncateString } from '@/utils/format-string'
import Link from 'next/link'
import {
    MeetingStatus,
    MeetingStatusColor,
    MeetingStatusName,
} from '@/constants/meeting'
import { enumToArray } from '@/utils'
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { useAuthLogin } from '@/stores/auth/hooks'
import { checkPermission } from '@/utils/auth'
import { Permissions } from '@/constants/permission'

const { Text } = Typography
const ItemFutureBoardMeeting = ({
    meetings_id,
    meetings_title,
    meetings_start_time,
    meetings_end_time,
    meetings_meeting_link,
    isJoined,
    meetings_status,
    meetings_note,
}: IMeetingItem) => {
    const router = useRouter()
    const t = useTranslations()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { joinMeetingAction } = useAttendance()
    const { openNotification, contextHolder } = useNotification()
    const { authState } = useAuthLogin()
    const permissionDetail = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.DETAIL_BOARD_MEETING,
    )

    const permissionEdit = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.EDIT_BOARD_MEETING,
    )

    const showModal = (startTime: string) => {
        const result = calculateTimeDifference(startTime)
        if (result) {
            const messageNoti = t('BOARD_MEETING_START_MESSAGE', {
                days: result[0].toString(),
                hours: result[1].toString(),
                minutes: result[2].toString(),
            })
            openNotification({
                message: messageNoti,
                placement: 'bottomRight',
                type: 'info',
            })
            return
        }
        setIsModalOpen(true)
    }
    const handleOk = (idMeeting: number) => {
        joinMeetingAction(idMeeting)
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            {contextHolder}
            <Row className="mb-2 rounded-lg border p-2" gutter={[16, 16]}>
                <Col span={6} className="flex items-center space-x-2">
                    <Image
                        src="/images/logo-meeting-future.png"
                        alt="service-image-alt"
                        width={72}
                        height={48}
                    />
                    <Text>
                        {formatTimeMeeting(
                            meetings_start_time.toString(),
                            meetings_end_time.toString(),
                        )}
                    </Text>
                </Col>
                <Col span={4} className="flex items-center">
                    <Tooltip
                        placement="topLeft"
                        title={
                            meetings_note && (
                                <>
                                    {truncateString({
                                        text: meetings_note,
                                        start: 200,
                                        end: 0,
                                    })
                                        .split('\n')
                                        .map((text, index) => (
                                            <div key={index}>{text}</div>
                                        ))}
                                </>
                            )
                        }
                        overlayClassName=" lg:max-2xl:max-w-[370px] 2xl:max-w-[500px]"
                        color={'rgba(81, 81, 229, 1)'}
                    >
                        <Text>{meetings_title}</Text>
                    </Tooltip>
                </Col>
                <Col span={5}></Col>
                <Col span={3} className="flex items-center pl-4">
                    <Link href={meetings_meeting_link.toString()}>
                        <Text className="text-blue-500 hover:underline">
                            {t('BOARD_MEETING_LINK')}
                        </Text>
                    </Link>
                </Col>
                <Col span={2} className="flex items-center">
                    {enumToArray(MeetingStatus).map((status, key) => {
                        if (status === meetings_status) {
                            return (
                                <li
                                    key={key}
                                    style={{
                                        color: MeetingStatusColor[status],
                                    }}
                                >
                                    {t(MeetingStatusName[status])}
                                </li>
                            )
                        }
                    })}
                </Col>
                <Col span={2} className="flex items-center justify-center">
                    {isJoined === 0 ? (
                        <Button
                            className="w-[68px]"
                            type="primary"
                            // size="middle"
                            onClick={() => showModal(meetings_start_time)}
                        >
                            {t('BTN_JOIN')}
                        </Button>
                    ) : (
                        <Button type="primary" size="middle" disabled>
                            {t('JOINED')}
                        </Button>
                    )}
                </Col>
                <Col
                    span={2}
                    className="flex items-center justify-end gap-5 space-x-2 pr-5"
                >
                    <div className="flex gap-3">
                        {permissionEdit && (
                            <EditTwoTone
                                style={{ fontSize: '18px' }}
                                twoToneColor="#5151e5"
                                onClick={() => {
                                    router.push(
                                        `/board-meeting/update/${meetings_id}`,
                                    )
                                }}
                            />
                        )}
                        {permissionDetail && (
                            <EyeTwoTone
                                style={{ fontSize: '18px' }}
                                twoToneColor="#5151e5"
                                onClick={() => {
                                    router.push(
                                        `/board-meeting/detail/${meetings_id}`,
                                    )
                                }}
                            />
                        )}
                    </div>
                </Col>
            </Row>

            <Modal
                title={t('TITLE_CONFIRM_MEETING_POPUP')}
                open={isModalOpen}
                onOk={() => handleOk(meetings_id)}
                onCancel={handleCancel}
                okText={t('BTN_CONFIRM')}
                cancelText={t('BTN_CANCLE')}
            >
                <p>{t('CONTENT_CONFIRM_MEETING_POPUP')}</p>
            </Modal>
        </>
    )
}

export default ItemFutureBoardMeeting
