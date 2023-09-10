import BoxArea from '@/components/box-area'
import EmptyMeeting from '@/views/meeting/meeting-list/empty-meeting'
import ItemPastMeeting from '@/views/meeting/meeting-list/item-past-meeting'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Pagination } from 'antd'
import { useTranslations } from 'next-intl'

interface ListPastMeetingProps {
    data: IMeetingItem[]
    hasData: boolean
}

const ListPastMeeting = ({data, hasData}: ListPastMeetingProps) => {
    const t = useTranslations()
    return (
        <div className="list-meeting-past mt-6">
            <BoxArea title={t('MEETING_PAST_LIST')}>
                {hasData && data && data.length > 0 ? (
                    <>
                        {data.map((item, index) => (
                            <ItemPastMeeting key={index} {...item} />
                        ))}
                        <div className="mt-6 flex justify-end">
                            <Pagination defaultCurrent={1} total={50} />
                        </div>
                    </>
                ) : (
                    <EmptyMeeting
                        emptyMeetingMessage={t('NO_MEETING_PAST_MESSAGE')}
                    />
                )}
            </BoxArea>
        </div>
    )
}

export default ListPastMeeting
