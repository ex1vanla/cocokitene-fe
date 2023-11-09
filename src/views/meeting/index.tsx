import withAuth from '@/components/component-auth'
import ListTitle from '@/components/content-page-title/list-title'
import { MeetingStatus, MeetingStatusColor, MeetingType } from '@/constants/meeting'
import { Permissions } from '@/constants/permission'
import { useNotification } from '@/hooks/use-notification'
import { useAttendance } from '@/stores/attendance/hooks'
import { useAuthLogin } from '@/stores/auth/hooks'
import { useListMeeting } from '@/stores/meeting/hooks'
import { EActionStatus } from '@/stores/type'
import { enumToArray } from '@/utils'
import ListMeetingFuture from '@/views/meeting/meeting-list/list-future-meeting'
import ListMeetingPast from '@/views/meeting/meeting-list/list-past-meeting'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const MeetingList = () => {
    const router = useRouter()
    const t = useTranslations()
    const { attendanceState, resetStateAttendance } = useAttendance()
    const { openNotification, contextHolder } = useNotification()

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
        // eslint-disable-next-line
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
            resetStateAttendance()
            router.push('/meeting/detail/' + attendanceState.meetingIdJoin)
        }

        if (attendanceState.status == EActionStatus.Failed) {
            openNotification({
                message: attendanceState.errorMessage,
                placement: 'bottomRight',
                type: 'error',
            })
        }
        // eslint-disable-next-line
    }, [attendanceState.status])

    useEffect(() => {
        if (meetingState.status == EActionStatus.Failed) {
            openNotification({
                message: meetingState.errorMessage,
                placement: 'bottomRight',
                type: 'error',
            })
        }
        // eslint-disable-next-line
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

export default withAuth(MeetingList, Permissions.LIST_MEETING)
