import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Button, Col, Row, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const { Text } = Typography

const ItemPastMeeting = ({
    meetingTime,
    meetingDate,
    meetingSummary,
    meetingType,
    meetingStatus,
}: IMeetingItem) => {
    const t = useTranslations()
    return (
        <Row
            className="border-true-gray-300 mb-2 rounded-lg border p-2"
            gutter={[16, 16]}
        >
            <Col span={5} className="flex items-center space-x-2">
                <Image
                    src='/images/logo-meeting-past.png'
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
                <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {meetingSummary}
                </Text>
            </Col>
            <Col span={3} className="flex items-center pl-4">
                <Text>{meetingType}</Text>
            </Col>
            <Col span={2} className="flex items-center justify-center">
                <li className="text-green-500">{meetingStatus}</li>
            </Col>
            <Col span={4} className="flex items-center justify-end">
                <Button size="middle">{t('BTN_VIEW_DETAIL')}</Button>
            </Col>
        </Row>
    )
}

export default ItemPastMeeting
