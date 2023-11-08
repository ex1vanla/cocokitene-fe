import { useAttendance } from '@/stores/attendance/hooks'
import { formatDate, formatTimeMeeting, statusDateMeeting } from '@/utils/date'
import { truncateString } from '@/utils/format-string'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Button, Col, Modal, Row, Tooltip, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const { Text } = Typography

const ItemFutureMeeting = ({
    meetings_id,
    meetings_title,
    meetings_start_time,
    meetings_end_time,
    meetings_meeting_link,
    isJoined,
    meetings_status_meeting_happen,
    meetings_note,
}: IMeetingItem) => {
    const router = useRouter()
    const t = useTranslations()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { joinMeetingAction } = useAttendance()

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = (idMeeting: number) => {
        joinMeetingAction(idMeeting)
        // dispatch(setMeetingIdJoin({ meetingId: idMeeting }))
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <Tooltip
                overlayStyle={{ color: 'red' }}
                title={truncateString({
                    text: meetings_note,
                    start: 200,
                    end: 0,
                })}
            >
                <Row
                    className="border-true-gray-300 mb-2 rounded-lg border p-2"
                    gutter={[16, 16]}
                >
                    <Col span={5} className="flex items-center space-x-2">
                        <Image
                            src="/images/logo-meeting-future.png"
                            alt="service-image-alt"
                            width={72}
                            height={48}
                        />
                        <Text className="font-medium">
                            {formatTimeMeeting(
                                meetings_start_time.toString(),
                                meetings_end_time.toString(),
                            )}
                        </Text>
                    </Col>
                    <Col span={2} className="flex items-center ">
                        <Text>
                            {formatDate(
                                meetings_start_time.toString(),
                                'YYYY-MM-DD',
                            )}
                        </Text>
                    </Col>
                    <Col span={8} className="flex items-center">
                        <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap ">
                            {meetings_title}
                        </Text>
                    </Col>
                    <Col span={3} className="flex items-center pl-4">
                        <Link href={meetings_meeting_link.toString()}>
                            <Text>Headquarters & Online</Text>
                        </Link>
                    </Col>
                    <Col span={2} className="flex items-center pl-3">
                        {meetings_status_meeting_happen == '0' ? (
                            <li className="text-red-500">{t('PENDING')}</li>
                        ) : statusDateMeeting(
                              meetings_start_time.toString(),
                              meetings_end_time.toString(),
                          ) ? (
                            <li className="text-green-500">
                                {t('IN_PROGRESS')}
                            </li>
                        ) : (
                            <li className="text-primary">{t('FUTURE')}</li>
                        )}
                    </Col>
                    <Col
                        span={4}
                        className="flex items-center justify-end space-x-2"
                    >
                        {isJoined === 0 ? (
                            <Button
                                type="primary"
                                size="middle"
                                onClick={() => showModal()}
                            >
                                {t('BTN_JOIN')}
                            </Button>
                        ) : (
                            <Button disabled type="primary" size="middle">
                                {t('JOINED')}
                            </Button>
                        )}
                        <Button
                            size="middle"
                            onClick={() => {
                                router.push('/meeting/detail/' + meetings_id)
                            }}
                        >
                            {t('BTN_VIEW_DETAIL')}
                        </Button>
                    </Col>
                </Row>
            </Tooltip>

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

export default ItemFutureMeeting
