import { formatDate, formatTimeMeeting } from '@/utils/date'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Button, Col, Row, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

const { Text } = Typography

const ItemPastMeeting = ({
    meetings_title,
    meetings_start_time,
    meetings_end_time,
    meetings_meeting_link,
    meetings_status_meeting_happen,
}: IMeetingItem) => {
    const t = useTranslations()
    return (
        <Row
            className="border-true-gray-300 mb-2 rounded-lg border p-2"
            gutter={[16, 16]}
        >
            <Col span={5} className="flex items-center space-x-2">
                <Image
                    src="/images/logo-meeting-past.png"
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
                    {formatDate(meetings_start_time.toString(), 'YYYY-MM-DD')}
                </Text>
            </Col>
            <Col span={8} className="flex items-center">
                <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {meetings_title}
                </Text>
            </Col>
            <Col span={3} className="flex items-center pl-4">
                <Link href={meetings_meeting_link.toString()}>
                    <Text>Headquarters & Online</Text>
                </Link>
            </Col>
            <Col span={2} className="flex items-center pl-3">
                {/* <li className="text-green-500">Done</li> */}
                {meetings_status_meeting_happen == '0' ? (
                    <li className="text-red-500">{t('PENDING')}</li>
                ) : (
                    <li className="text-green-500">{t('DONE')}</li>
                )}
            </Col>
            <Col span={4} className="flex items-center justify-end">
                <Button size="middle">{t('BTN_VIEW_DETAIL')}</Button>
            </Col>
        </Row>
    )
}

export default ItemPastMeeting
