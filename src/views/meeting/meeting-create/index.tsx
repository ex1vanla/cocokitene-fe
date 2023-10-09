/* eslint-disable */
import CreateTitle from '@/components/content-page-title/create-title'
// import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import AmendmentResolutions from '@/views/meeting/meeting-create/amendment-resolutions'
import MeetingInformation from '@/views/meeting/meeting-create/meeting-information'
import Participants from '@/views/meeting/meeting-create/participants'
import Resolutions from '@/views/meeting/meeting-create/resolutions'
import { useTranslations } from 'next-intl'

const MeetingCreate = () => {
    const t = useTranslations()
    // const [data, setData] = useCreateMeetingInformation()
    // const setClick = () => {
    //     setData({
    //         ...data,
    //         title: '123',
    //         meetingLink: '213323',
    //     })
    // }

    return (
        <div>
            {/* <div>{data.title}</div>
            <div>{data.meetingLink}</div> */}
            {/* <Button onClick={setClick}>Save</Button> */}
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
