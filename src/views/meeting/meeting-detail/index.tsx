import withAuth from '@/components/component-auth'
import DetailTitle from '@/components/content-page-title/detail-title'
import Loader from '@/components/loader'
import { Permissions } from '@/constants/permission'
import { useMeetingDetail } from '@/stores/meeting/hooks'
import { EActionStatus } from '@/stores/type'
import AmendmentResolutions from '@/views/meeting/meeting-detail/amendment-resolutions'
import DetailInformation from '@/views/meeting/meeting-detail/detail-information'
import Documents from '@/views/meeting/meeting-detail/documents'
import Participants from '@/views/meeting/meeting-detail/participants'
import Resolutions from '@/views/meeting/meeting-detail/resolutions'
import SendEmailButton from '@/views/meeting/meeting-detail/send-email-button'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

const MeetingDetail = () => {
    const [{ meeting, status }, fetchMeetingDetail] = useMeetingDetail()

    const params = useParams()

    const meetingId = Number(params.id)

    useEffect(() => {
        if (meetingId) {
            fetchMeetingDetail(meetingId)
        }
    }, [meetingId, fetchMeetingDetail])

    if (!meeting || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div>
            <DetailTitle
                pageName={meeting.title}
                editUrl={`/meeting/update/${meetingId}`}
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

export default withAuth(MeetingDetail, Permissions.DETAIL_MEETING)
