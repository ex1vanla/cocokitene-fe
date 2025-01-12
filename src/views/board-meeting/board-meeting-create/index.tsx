/* eslint-disable */

import CreateTitle from '@/components/content-page-title/create-title'
import { useTranslations } from 'next-intl'
import SaveCreateBoardMeetingButton from '@/views/board-meeting/board-meeting-create/save-button'
import BoardMeetingInformation from '@/views/board-meeting/board-meeting-create/board-meeting-information'
import ManagementAndFinancialReports from '@/views/board-meeting/board-meeting-create/management-and-financial-reports'
import Elections from '@/views/board-meeting/board-meeting-create/elections'
import BoardMeetingParticipants from '@/views/board-meeting/board-meeting-create/board-meeting-participants'
import Candidates from '@/views/board-meeting/board-meeting-create/candidates'
import withAuth from '@/components/component-auth'
import { Permissions } from '@/constants/permission'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import { useEffect, useState } from 'react'
import companyServicePlan from '@/services/company-service-plan'

const BoardMeetingCreate = () => {
    const t = useTranslations()
    const [allowUploadFile, setAllowUploadFile] = useState<boolean>(true)
    const [, , resetData] = useCreateBoardMeetingInformation()

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
                pageName={t('CREATE_NEW_BOARD_MEETING')}
                saveButton={<SaveCreateBoardMeetingButton />}
            />
            <div className="flex flex-col gap-6 p-6 max-[470px]:px-2">
                <BoardMeetingInformation allowUploadFile={allowUploadFile} />
                <ManagementAndFinancialReports
                    allowUploadFile={allowUploadFile}
                />
                <Elections allowUploadFile={allowUploadFile} />
                <Candidates />
                <BoardMeetingParticipants />
            </div>
        </div>
    )
}

export default withAuth(BoardMeetingCreate, Permissions.CREATE_BOARD_MEETING)
