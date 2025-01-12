import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/stores'
import { useTranslations } from 'next-intl'
import BoxArea from '@/components/box-area'
import ItemPassBoardMeeting from '@/views/board-meeting/board-meeting-list/item-pass-board-meeting'
import { MeetingTime, MeetingType } from '@/constants/meeting'
import { Pagination } from 'antd'
import EmptyMeeting from '@/views/meeting/meeting-list/empty-meeting'
import { getAllPassBoardMeetings } from '@/stores/board-meeting/listSlice'
import ModalCheckDataInMtg from '@/components/check-data-meeting'

export interface ListPassBoardMeetingProps {
    data: IMeetingItem[]
}

const ListBoardMeetingPast = ({ data }: ListPassBoardMeetingProps) => {
    const { page, limit, totalPassMeetingItem, filter } = useSelector(
        (state: RootState) => state.boardMeetingList,
    )
    const dispatch = useAppDispatch()
    const t = useTranslations()
    const handlePageChange = (pageChange: number) => {
        dispatch(
            getAllPassBoardMeetings({
                page: pageChange,
                limit,
                type: MeetingTime.MEETING_PASS,
                filter: { ...filter },
                meetingType: MeetingType.BOARD_MEETING,
            }),
        )
    }

    return (
        <div className="list-board-meeting-pass mt-6">
            <BoxArea title={t('BOARD_MEETING_PAST_LIST')}>
                {data && data.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <div className="min-w-[845px]">
                                {data.map((item, index) => (
                                    <ItemPassBoardMeeting
                                        key={index}
                                        {...item}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Pagination
                                defaultCurrent={page}
                                pageSize={limit}
                                total={totalPassMeetingItem}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                ) : (
                    <EmptyMeeting
                        emptyMeetingMessage={t('NO_BOARD_MEETING_PASS_MESSAGE')}
                    />
                )}
            </BoxArea>
            <ModalCheckDataInMtg />
        </div>
    )
}
export default ListBoardMeetingPast
