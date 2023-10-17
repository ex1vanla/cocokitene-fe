import BoxArea from '@/components/box-area'
import ParticipantDetail from '@/components/participants-detail'
import { useParticipants } from '@/stores/meeting/hooks'
import { useTranslations } from 'next-intl'

const Participants = () => {
    const t = useTranslations()

    const {
        hosts,
        controlBoards,
        administrativeCouncils,
        shareholders,
        directors,
    } = useParticipants()

    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <ParticipantDetail title={t('HOST')} participantList={hosts} />
                <ParticipantDetail
                    title={t('CONTROL_BOARD')}
                    participantList={controlBoards}
                />
                <ParticipantDetail
                    title={t('DIRECTOR_GENERAL')}
                    participantList={directors}
                />
                <ParticipantDetail
                    title={t('ADMINISTRATIVE_COUNCIL')}
                    participantList={administrativeCouncils}
                />
                <ParticipantDetail
                    title={t('SHAREHOLDERS')}
                    participantList={shareholders}
                />
            </div>
        </BoxArea>
    )
}

export default Participants
