import withAuth from '@/components/component-auth'
import DetailTitle from '@/components/content-page-title/detail-title'
import Loader from '@/components/loader'
import { Permissions } from '@/constants/permission'
import { useAuthLogin } from '@/stores/auth/hooks'
import { useMeetingDetail } from '@/stores/meeting/hooks'
import { EActionStatus } from '@/stores/type'
import { checkPermission } from '@/utils/auth'
import AmendmentResolutions from '@/views/meeting/meeting-detail/amendment-resolutions'
import DetailInformation from '@/views/meeting/meeting-detail/detail-information'
import Documents from '@/views/meeting/meeting-detail/documents'
import Participants from '@/views/meeting/meeting-detail/participants'
import Resolutions from '@/views/meeting/meeting-detail/resolutions'
import SendEmailButton from '@/views/meeting/meeting-detail/send-email-button'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { truncateString } from '@/utils/format-string'

const MeetingDetail = () => {
    const t = useTranslations()

    const [{ meeting, status }, fetchMeetingDetail] = useMeetingDetail()

    const params = useParams()

    const router = useRouter()

    const meetingId = Number(params.id)

    const { authState } = useAuthLogin()

    const permissionEditMeeting = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.EDIT_MEETING,
    )

    const permissionSendEmailShareholder = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.SEND_MAIL_TO_SHAREHOLDER,
    )

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
                urlBack="/meeting"
                pageName={
                    meeting.title.length > 100
                        ? truncateString({
                              text: meeting.title,
                              start: 70,
                              end: 5,
                          })
                        : meeting.title
                }
                editButton={
                    permissionEditMeeting && (
                        <Button
                            icon={<EditOutlined />}
                            type="default"
                            size="large"
                            onClick={() =>
                                router.push(`/meeting/update/${meetingId}`)
                            }
                        >
                            {t('EDIT')}
                        </Button>
                    )
                }
                // editUrl={`/meeting/update/${meetingId}`}
                extraButton={
                    permissionSendEmailShareholder && <SendEmailButton />
                }
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
