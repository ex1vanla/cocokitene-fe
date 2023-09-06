import CreateTitle from '@/components/content-page-title/create-title'
import AmendmentResolutions from '@/views/meeting/meeting-create/amendment-resolutions'
import MeetingInformation from '@/views/meeting/meeting-create/meeting-information'
import Participants from '@/views/meeting/meeting-create/participants'
import Resolutions from '@/views/meeting/meeting-create/resolutions'
import { useTranslations } from 'next-intl'

const MeetingCreate = () => {
    const t = useTranslations()

    return (
        <div>
            <CreateTitle pageName={t('CREATE_NEW_MEETING')} />
            <div className="flex flex-col gap-6 p-6">
                <MeetingInformation />
                <Resolutions />
                <AmendmentResolutions />
                <Participants />
            </div>
        </div>
    )
}

export default MeetingCreate
