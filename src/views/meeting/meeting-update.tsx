import UpdateTitle from '@/components/content-page-title/update-title'
import { useTranslations } from 'next-intl'

const MeetingUpdate = () => {
    const t = useTranslations()

    return (
        <div>
            <UpdateTitle pageName={t('UPDATE_MEETING')} />
            <div className="p-6">this is meeting update</div>
        </div>
    )
}

export default MeetingUpdate
