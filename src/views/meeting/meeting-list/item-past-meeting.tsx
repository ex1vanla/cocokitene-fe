import {
    MeetingStatus,
    MeetingStatusColor,
    MeetingStatusName,
} from '@/constants/meeting'
import { Permissions } from '@/constants/permission'
import { useAuthLogin } from '@/stores/auth/hooks'
import { enumToArray } from '@/utils'
import { checkPermission } from '@/utils/auth'
import { formatTimeMeeting } from '@/utils/date'
import { truncateString } from '@/utils/format-string'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { EyeTwoTone } from '@ant-design/icons'
import { Col, Row, Tooltip, Typography } from 'antd'
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
    meetings_status,
    meetings_note,
}: IMeetingItem) => {
    const t = useTranslations()
    const router = useRouter()

    const { authState } = useAuthLogin()
    const permissionDetail = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.DETAIL_MEETING,
    )

    return (
        <Row
            className="border-true-gray-300 mb-2 rounded-lg border p-2"
            gutter={[16, 16]}
        >
            <Col span={7} className="flex items-center space-x-2">
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
            <Col span={8} className="flex items-center">
                <Tooltip
                    placement="topLeft"
                    // title={truncateString({
                    //     text: meetings_note,
                    //     start: 200,
                    //     end: 0,
                    // })}
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
            <Col span={4} className="flex items-center justify-end pr-5">
                {permissionDetail && (
                    <EyeTwoTone
                        style={{ fontSize: '18px' }}
                        twoToneColor="#5151e5"
                        onClick={() => {
                            router.push(`/meeting/detail/${meetings_id}`)
                        }}
                    />
                )}
            </Col>
        </Row>
    )
}

export default ItemPastMeeting
