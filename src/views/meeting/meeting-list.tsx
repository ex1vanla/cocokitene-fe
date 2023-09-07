import ListTitle from '@/components/content-page-title/list-title'
import ListMeetingFuture from '@/views/meeting/meeting-list/list-meeting-future'
import ListMeetingPast from '@/views/meeting/meeting-list/list-meeting-past'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'

const MeetingList = () => {
    const t = useTranslations()

    return (
        <div>
            <ListTitle
                pageName={t('LIST_MEETINGS')}
                addIcon={<VideoCameraAddOutlined />}
                createLink="/meeting/create"
            />
            <div className="p-6">
                <ListMeetingFuture />
                <ListMeetingPast />
            </div>
        </div>
    )
}

export default MeetingList