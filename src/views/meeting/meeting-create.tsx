import CreateTitle from '@/components/content-page-title/create-title'
import { useTranslations } from 'next-intl'

const MeetingCreate = () => {
    const t = useTranslations()

    return (
        <div>
            <CreateTitle pageName={t('CREATE_NEW_MEETING')} />
            <div className="p-6">this is meeting create page</div>
        </div>
    )
}

export default MeetingCreate
