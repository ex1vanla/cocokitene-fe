import MeetingEmpty from '@/views/meeting/meeting-list/meeting-empty'
import MeetingItem, {
    IMeetingItem,
} from '@/views/meeting/meeting-list/meeting-item/meeting-item'
import { Button, Pagination, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const { Title } = Typography

const meetingsPastList: IMeetingItem[] = [
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
    {
        meetingLogo: '/images/logo-meeting-past.png',
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            'Để căn chỉnh nội dung trong mỗi cột nằm chính giữa theo chiều dọc trục Y chính giữa theo chiều dọc trục Y',
        meetingType: 'Headquaters & Online',
        meetingStatus: 'Done',
        meetingCategory: 'past',
    },
]

const ListMeetingPast = () => {
    const t = useTranslations();
    const [data, setData] = useState<boolean>(false)
    return (
        <div className="list-meeting-past mt-5">
            <Button size="middle" onClick={() => setData(!data)}>
                Set data
            </Button>
            <div className="mb-0.5 bg-white">
                <Title level={5} className=" mb-0 py-4 pl-6 font-medium">
                    {t('MEETING_PAST_LIST')}
                </Title>
            </div>
            <div className="bg-white px-6 py-5">
                {data ? (
                    <>
                        {meetingsPastList.map((item, index) => (
                            <MeetingItem key={index} {...item} />
                        ))}
                        <div className="mt-5 flex justify-end">
                            <Pagination defaultCurrent={1} total={50} />
                        </div>
                    </>
                ) : (
                    <MeetingEmpty NoMeetingsMessage={t('NO_MEETING_PAST_MESSAGE')} />
                )}
            </div>
        </div>
    )
}

export default ListMeetingPast
