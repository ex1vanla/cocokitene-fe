import UpdateTitle from '@/components/content-page-title/update-title'
import AmendmentResolutions from '@/views/meeting/meeting-update/amendment-resolutions'
import MeetingInformation from '@/views/meeting/meeting-update/meeting-information'
import Participants from '@/views/meeting/meeting-update/participants'
import Resolutions from '@/views/meeting/meeting-update/resolutions'
import { useTranslations } from 'next-intl'

const MeetingUpdate = () => {
    const t = useTranslations()

    return (
        <div>
            <UpdateTitle pageName={t('UPDATE_MEETING')} />
            <div className="flex flex-col gap-6 p-6">
                <MeetingInformation />
                <Resolutions />
                <AmendmentResolutions />
                <Participants />
            </div>
        </div>
    )
}

export default MeetingUpdate
