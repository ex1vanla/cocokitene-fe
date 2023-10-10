import ListTitle from '@/components/content-page-title/list-title'
import { MeetingType, SORT } from '@/constants/meeting'
import { useNotification } from '@/hooks/use-notification'
import useDebounce from '@/hooks/useDebounce'
import { RootState, useAppDispatch } from '@/stores'
import { resetStatusMeeting } from '@/stores/attendance/slice'
import { getAllMeetings, getAllPassMeetings } from '@/stores/meeting/listSlice'
import ListMeetingFuture from '@/views/meeting/meeting-list/list-future-meeting'
import ListMeetingPast from '@/views/meeting/meeting-list/list-past-meeting'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const MeetingList = () => {
    const { statusMeeting, meetingIdJoin } = useSelector(
        (state: RootState) => state.attendance,
    )
    const { openNotification, contextHolder } = useNotification()
    const [keywordSearch, setKeywordSearch] = useState<string>('')
    const [sort, setSort] = useState<string>('ASC')
    const { page, limit, meetingFutureList, meetingPassList } = useSelector(
        (state: RootState) => state.meetingList,
    )
    const searchDebounceValue = useDebounce(keywordSearch, 300)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(
            getAllMeetings({param: {
                    page,
                    limit,
                    type: MeetingType.MEETING_FUTURE,
                    searchQuery: searchDebounceValue?.trim(),
                    sortOrder: 'ASC',
            }}),
        )

        dispatch(
            getAllPassMeetings({param: {
                page,
                limit,
                type: MeetingType.MEETING_FUTURE,
                searchQuery: searchDebounceValue?.trim(),
                sortOrder: 'ASC',
        }}),
        )
    }, [dispatch, searchDebounceValue])

    const handleInputChange = (value: string) => {
        setKeywordSearch(value)
    }

    const handleSelectChange = (value: string) => {
        value == SORT.ASC ? setSort(SORT.ASC) : setSort(SORT.DESC)
    }

    const t = useTranslations()
    const router = useRouter()

    useEffect(() => {
        if (statusMeeting === 0) {
            openNotification({
                message: t('MESSAGE_MEETING_NOT_START_YET'),
                placement: 'bottomRight',
                type: 'info',
            })
        }
        if (statusMeeting === 1 && meetingIdJoin != null) {
            dispatch(resetStatusMeeting({meetingId: 1}));
            router.push("/meeting/detail/" + meetingIdJoin);
        }
        if(statusMeeting === 2) {
            openNotification({
                message: t('MESSAGE_MEETING_CANCELED'),
                placement: 'bottomRight',
                type: 'error',
            })
        }
    }, [statusMeeting, meetingIdJoin])

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
                <ListMeetingFuture data={meetingFutureList} />
                <ListMeetingPast data={meetingPassList} />
            </div>
        </div>
    )
}

export default MeetingList
