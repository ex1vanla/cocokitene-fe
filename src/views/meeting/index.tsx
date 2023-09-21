import ListTitle from '@/components/content-page-title/list-title'
import ListMeetingFuture from '@/views/meeting/meeting-list/list-future-meeting'
import ListMeetingPast from '@/views/meeting/meeting-list/list-past-meeting'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const meetingFutureList: IMeetingItem[] = [
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'To do',
    },
]

const meetingPastList: IMeetingItem[] = [
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
    {
        meetingTime: '10:00 AM - 10:45 AM',
        meetingDate: '20/07/2023',
        meetingSummary:
            '謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡謹んで新年のお喜びを申し上げます｡',
        meetingType: 'う まくいくといいね ',
        meetingStatus: 'Done',
    },
]

const MeetingList = () => {
    const t = useTranslations()
    const [hasData, setHasData] = useState<boolean>(false)
    return (
        <div>
            <ListTitle
                pageName={t('LIST_MEETINGS')}
                addIcon={<VideoCameraAddOutlined />}
                createLink="/meeting/create"
            />
            <div className="p-6">
                <Button size="middle" onClick={() => setHasData(!hasData)}>
                    Set data
                </Button>
                <ListMeetingFuture data={meetingFutureList} hasData={hasData} />
                <ListMeetingPast data={meetingPastList} hasData={hasData}/>
            </div>
        </div>
    )
}

export default MeetingList
