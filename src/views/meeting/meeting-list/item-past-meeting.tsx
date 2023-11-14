import { formatDate, formatTimeMeeting } from '@/utils/date'
import { truncateString } from '@/utils/format-string'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Button, Col, Row, Tooltip, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const { Text } = Typography

const ItemPastMeeting = ({
    meetings_id,
    meetings_title,
    meetings_start_time,
    meetings_end_time,
    meetings_meeting_link,
    meetings_status_meeting_happen,
    meetings_note,
}: IMeetingItem) => {
    const t = useTranslations()

    const router = useRouter()
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
                <Tooltip
                    placement="topLeft"
                    title={truncateString({
                        text: meetings_note,
                        start: 200,
                        end: 0,
                    })}
                    overlayClassName="lg:max-2xl:max-w-[370px] 2xl:max-w-[500px]"
                    color={'rgba(81, 81, 229, 1)'}
                >
                    <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap ">
                        {meetings_title}
                    </Text>
                </Tooltip>
            </Col>
            <Col span={3} className="flex items-center pl-4">
                <Link href={meetings_meeting_link.toString()}>
                    <Text className="text-blue-500 hover:underline">
                        {t('MEETING_LINK')}
                    </Text>
                </Link>
            </Col>
            <Col span={2} className="flex items-center pl-3">
                {meetings_status_meeting_happen == '0' ? (
                    <li className="text-red-500">{t('PENDING')}</li>
                ) : (
                    <li className="text-green-500">{t('DONE')}</li>
                )}
            </Col>
            <Col span={4} className="flex items-center justify-end">
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
    )
}

export default ItemPastMeeting
