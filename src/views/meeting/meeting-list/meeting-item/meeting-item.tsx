import { Button, Col, Row, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const { Text } = Typography

export interface IMeetingItem {
    meetingLogo: string
    meetingTime: String
    meetingDate: String
    meetingSummary: String
    meetingType: String
    meetingStatus: String
    meetingCategory: 'feature' | 'past'
}

const MeetingItem = ({
    meetingLogo,
    meetingTime,
    meetingDate,
    meetingSummary,
    meetingType,
    meetingStatus,
    meetingCategory,
}: IMeetingItem) => {
    const t = useTranslations();
    return (
        <Row
            className="border-true-gray-300 mb-2 rounded-lg border p-2"
            gutter={[16, 16]}
        >
            <Col span={5} className="flex items-center">
                <Image
                    src={meetingLogo}
                    alt="service-image-alt"
                    width={60}
                    height={60}
                />
                <Text className="ml-4 font-bold">{meetingTime}</Text>
            </Col>
            <Col span={2} className="flex items-center ">
                <Text>{meetingDate}</Text>
            </Col>
            <Col span={7} className="flex items-center">
                <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {meetingSummary}
                </Text>
            </Col>
            <Col span={4} className="flex items-center pl-4">
                <Text>{meetingType}</Text>
            </Col>
            <Col span={2} className="flex items-center">
                <li
                    className={
                        meetingCategory == 'past'
                            ? 'text-green-500'
                            : 'text-primary'
                    }
                >
                    {meetingStatus}
                </li>
            </Col>
            <Col span={4} className="flex items-center justify-center">
                <Button size="middle">{t('BTN_VIEW_DETAIL')}</Button>
                <Button
                    type="primary"
                    size="middle"
                    className="ml-4"
                    disabled={meetingCategory == 'past' ? true : false}
                >
                    {t('BTN_JOIN')}
                </Button>
            </Col>
        </Row>
    )
}

export default MeetingItem
