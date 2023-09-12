import BoxArea from '@/components/box-area'
import EmptyMeeting from '@/views/meeting/meeting-list/empty-meeting'
import ItemFutureMeeting from '@/views/meeting/meeting-list/item-future-meeting'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Pagination } from 'antd'
import { useTranslations } from 'next-intl'

interface ListFutureMeetingProps {
    data: IMeetingItem[]
    hasData: boolean
}

const ListFutureMeeting = ({ data, hasData }: ListFutureMeetingProps) => {
    const t = useTranslations()
    return (
        <div className="list-meeting-future">
            <BoxArea title={t('MEETING_FUTURE_LIST')}>
                {hasData && data && data.length > 0 ? (
                    <>
                        {data.map((item, index) => (
                            <ItemFutureMeeting key={index} {...item} />
                        ))}
                        <div className="mt-6 flex justify-end">
                            <Pagination defaultCurrent={1} total={50} />
                        </div>
                    </>
                ) : (
                    <EmptyMeeting
                        emptyMeetingMessage={t('NO_MEETING_FUTURE_MESSAGE')}
                    />
                )}
            </BoxArea>
        </div>
    )
}

export default ListFutureMeeting
