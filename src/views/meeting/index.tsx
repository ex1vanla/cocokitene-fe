import withAuth from '@/components/component-auth'
import ListTitle from '@/components/content-page-title/list-title'
import { MeetingType } from '@/constants/meeting'
import { useNotification } from '@/hooks/use-notification'
import useDebounce from '@/hooks/useDebounce'
import { useAttendance } from '@/stores/attendance/hooks'
import { useListMeeting } from '@/stores/meeting/hooks'
import { EActionStatus } from '@/stores/type'
import ListMeetingFuture from '@/views/meeting/meeting-list/list-future-meeting'
import ListMeetingPast from '@/views/meeting/meeting-list/list-past-meeting'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MeetingList = () => {
    const router = useRouter()
    const t = useTranslations()
    const { attendanceState, resetStateAttendance } = useAttendance()
    const { openNotification, contextHolder } = useNotification()
    const [keywordSearch, setKeywordSearch] = useState<string>('')
    const searchDebounceValue = useDebounce(keywordSearch, 300)
    const {
        meetingState,
        getListFutureMeetingAction,
        getListPassMeetingAction,
        setFilterAction,
    } = useListMeeting()

    useEffect(() => {
        getListFutureMeetingAction({
            page: meetingState.page,
            limit: meetingState.limit,
            type: MeetingType.MEETING_FUTURE,
            filter: { ...meetingState.filter },
        })

        getListPassMeetingAction({
            page: meetingState.page,
            limit: meetingState.limit,
            type: MeetingType.MEETING_PASS,
            filter: { ...meetingState.filter },
        })
    }, [meetingState.filter])

    const handleInputChange = (value: string) => {
        setFilterAction({ ...meetingState.filter, searchQuery: value })
    }

    const handleSelectChange = (value: string) => {
        setFilterAction({ ...meetingState.filter, sortOrder: value })
    }

    useEffect(() => {
        if (attendanceState.status == EActionStatus.Succeeded) {
            openNotification({
                message: 'Meeting',
                placement: 'bottomRight',
                type: 'info',
            })
            resetStateAttendance();
            router.push('/meeting/detail/' + attendanceState.meetingIdJoin)
        }

        if (attendanceState.status == EActionStatus.Failed) {
            openNotification({
                message: attendanceState.errorMessage,
                placement: 'bottomRight',
                type: 'error',
            })
        }
    }, [attendanceState.status])

    useEffect(() => {
        if (meetingState.status == EActionStatus.Failed) {
            openNotification({
                message: meetingState.errorMessage,
                placement: 'bottomRight',
                type: 'error',
            })
        }
    }, [meetingState.status])

    return (
        <div>
            {contextHolder}
            <ListTitle
                pageName={t('LIST_MEETINGS')}
                addIcon={<VideoCameraAddOutlined />}
                createLink="/meeting/create"
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6">
                <ListMeetingFuture data={meetingState.meetingFutureList} />
                <ListMeetingPast data={meetingState.meetingPassList} />
            </div>
        </div>
    )
}

export default withAuth(MeetingList)
