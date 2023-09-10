import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Button, Col, Modal, Row, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

const { Text } = Typography

const ItemFutureMeeting = ({
    meetingLogo,
    meetingTime,
    meetingDate,
    meetingSummary,
    meetingType,
    meetingStatus,
}: IMeetingItem) => {
    const t = useTranslations()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <Row
                className="border-true-gray-300 rounded-lg border p-2"
                gutter={[16, 16]}
            >
                <Col span={5} className="flex items-center space-x-2">
                    <Image
                        src={meetingLogo}
                        alt="service-image-alt"
                        width={72}
                        height={48}
                    />
                    <Text className="font-medium">{meetingTime}</Text>
                </Col>
                <Col span={2} className="flex items-center ">
                    <Text>{meetingDate}</Text>
                </Col>
                <Col span={8} className="flex items-center">
                    <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap ">
                        {meetingSummary}
                    </Text>
                </Col>
                <Col span={3} className="flex items-center pl-4">
                    <Text>{meetingType}</Text>
                </Col>
                <Col span={2} className="flex items-center justify-center ">
                    <li className="text-primary">{meetingStatus}</li>
                </Col>
                <Col span={4} className="flex items-center justify-end space-x-2">
                    <Button type="primary" size="middle" onClick={showModal}>
                        {t('BTN_JOIN')}
                    </Button>
                    <Button size="middle">
                        {t('BTN_VIEW_DETAIL')}
                    </Button>
                </Col>
            </Row>
            <Modal
                title={t('TITLE_CONFIRM_MEETING_POPUP')}
                open={isModalOpen}
                onOk={handleOk}
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
