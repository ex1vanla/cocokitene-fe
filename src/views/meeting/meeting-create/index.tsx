/* eslint-disable */
import withAuth from '@/components/component-auth'
import CreateTitle from '@/components/content-page-title/create-title'
import { Permissions } from '@/constants/permission'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import AmendmentResolutions from '@/views/meeting/meeting-create/amendment-resolutions'
import MeetingInformation from '@/views/meeting/meeting-create/meeting-information'
import Participants from '@/views/meeting/meeting-create/participants'
import Resolutions from '@/views/meeting/meeting-create/resolutions'
import SaveCreateMeetingButton from '@/views/meeting/meeting-create/save-button'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import Candidate from './candidate'
import companyServicePlan from '@/services/company-service-plan'

const MeetingCreate = () => {
    const t = useTranslations()
    const [allowUploadFile, setAllowUploadFile] = useState<boolean>(true)

    const [, , resetData] = useCreateMeetingInformation()

    useEffect(() => {
        resetData()
        const fetchData = async () => {
            const response =
                await companyServicePlan.getAllowUploadFileForCompany()
            setAllowUploadFile(response)
        }
        fetchData()
    }, [])

    return (
        <div>
            <CreateTitle
                pageName={t('CREATE_NEW_MEETING')}
                saveButton={<SaveCreateMeetingButton />}
            />
            <div className="flex flex-col gap-6 p-6 max-[470px]:px-2">
                <MeetingInformation allowUploadFile={allowUploadFile} />
                <Resolutions allowUploadFile={allowUploadFile} />
                <AmendmentResolutions allowUploadFile={allowUploadFile} />
                <Candidate />
                <Participants />
            </div>
        </div>
    )
}

export default withAuth(MeetingCreate, Permissions.CREATE_MEETING)
