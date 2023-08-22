import ListTitle from '@/components/content-page-title/list-title'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

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
                <div>
                    <Link href="/meeting/detail/1">Go to detail page</Link>
                </div>
                <div>
                    <Link href="/meeting/update/1">Go to update page</Link>
                </div>
            </div>
        </div>
    )
}

export default MeetingList
