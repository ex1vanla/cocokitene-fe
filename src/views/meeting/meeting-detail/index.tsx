import DetailTitle from '@/components/content-page-title/detail-title'
import AmendmentResolutions from '@/views/meeting/meeting-detail/amendment-resolutions'
import DetailInformation from '@/views/meeting/meeting-detail/detail-information'
import Documents from '@/views/meeting/meeting-detail/documents'
import Participants from '@/views/meeting/meeting-detail/participants'
import Resolutions from '@/views/meeting/meeting-detail/resolutions'
import SendEmailButton from '@/views/meeting/meeting-detail/send-email-button'

const MeetingDetail = () => {
    return (
        <div>
            <DetailTitle
                pageName={'2nd Ordinary General Meeting of Shareholders'}
                extraButton={<SendEmailButton />}
            />
            <div className="flex flex-col gap-6 p-6">
                <DetailInformation />
                <Documents />
                <Resolutions />
                <AmendmentResolutions />
                <Participants />
            </div>
        </div>
    )
}

export default MeetingDetail
