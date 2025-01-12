import BoxArea from '@/components/box-area'
import ModalCheckDataInMtg from '@/components/check-data-meeting'
import { MeetingTime, MeetingType } from '@/constants/meeting'
import { RootState, useAppDispatch } from '@/stores'
import { getAllPassMeetings } from '@/stores/meeting/listSlice'
import EmptyMeeting from '@/views/meeting/meeting-list/empty-meeting'
import ItemPastMeeting from '@/views/meeting/meeting-list/item-past-meeting'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Pagination } from 'antd'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

interface ListPastMeetingProps {
    data: IMeetingItem[]
}

const ListPastMeeting = ({ data }: ListPastMeetingProps) => {
    const { page, limit, filter, totalPassMeetingItem } = useSelector(
        (state: RootState) => state.meetingList,
    )
    const dispatch = useAppDispatch()
    const t = useTranslations()
    const handlePageChange = (pageChange: number) => {
        dispatch(
            getAllPassMeetings({
                page: pageChange,
                limit,
                type: MeetingTime.MEETING_PASS,
                filter: { ...filter },
                meetingType: MeetingType.SHAREHOLDER_MEETING,
            }),
        )
    }

    return (
        <div className="list-meeting-past mt-6">
            <BoxArea title={t('MEETING_PAST_LIST')}>
                {data && data.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <div className="min-w-[845px]">
                                {data.map((item, index) => (
                                    <ItemPastMeeting key={index} {...item} />
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Pagination
                                pageSize={limit}
                                defaultCurrent={page}
                                total={totalPassMeetingItem}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                ) : (
                    <EmptyMeeting
                        emptyMeetingMessage={t('NO_MEETING_PAST_MESSAGE')}
                    />
                )}
            </BoxArea>
            <ModalCheckDataInMtg />
        </div>
    )
}

export default ListPastMeeting
