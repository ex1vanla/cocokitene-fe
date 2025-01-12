import withAuth from '@/components/component-auth'
import UpdateTitle from '@/components/content-page-title/update-title'
import { Permissions } from '@/constants/permission'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import SaveUpdateBoardMeetingButton from './save-button'
import BoardMeetingInformation from './board-meeting-information'
import ManagementAndFinancialReports from './management-and-financial-reports'
import { useEffect, useState } from 'react'
import { useUpdateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import { EActionStatus } from '@/stores/type'
import Loader from '@/components/loader'
import Elections from './elections'
import Participants from './participant'
import Candidate from './candidate'
import companyServicePlan from '@/services/company-service-plan'

const BoardMeetingUpdate = () => {
    const t = useTranslations()
    const params = useParams()
    const [allowUploadFile, setAllowUploadFile] = useState<boolean>(true)

    const [data, , status, initUpdateMeeting] =
        useUpdateBoardMeetingInformation()
    const meetingId = Number(params.id)

    useEffect(() => {
        const fetchData = async () => {
            const response =
                await companyServicePlan.getAllowUploadFileForCompany()
            setAllowUploadFile(response)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (meetingId) {
            initUpdateMeeting(meetingId)
        }
    }, [meetingId, initUpdateMeeting])

    if (!data || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div>
            <UpdateTitle
                pageName={t('UPDATE_BOARD_MEETING')}
                saveButton={<SaveUpdateBoardMeetingButton />}
            />
            <div className="flex flex-col gap-6 p-6">
                <BoardMeetingInformation allowUploadFile={allowUploadFile} />
                <ManagementAndFinancialReports
                    allowUploadFile={allowUploadFile}
                />
                <Elections allowUploadFile={allowUploadFile} />
                <Candidate />
                <Participants />
            </div>
        </div>
    )
}

export default withAuth(BoardMeetingUpdate, Permissions.EDIT_BOARD_MEETING)
