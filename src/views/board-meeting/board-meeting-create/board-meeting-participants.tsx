import { useTranslations } from 'next-intl'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import BoxArea from '@/components/box-area'
import ParticipantSelector, {
    IParticipants,
} from '@/components/participant-selector'

type BoardParticipantKey =
    | 'hosts'
    | 'controlBoards'
    | 'directors'
    | 'administrativeCouncils'

const BoardMeetingParticipants = () => {
    const t = useTranslations()
    const [data, setData] = useCreateBoardMeetingInformation()

    const onSelect =
        (key: BoardParticipantKey) => (participant: IParticipants) => {
            const isNotExisted =
                data[key].findIndex(
                    (p) => p.users_id === participant.users_id,
                ) < 0

            if (isNotExisted) {
                setData({
                    ...data,
                    [key]: [...data[key], participant],
                })
            }
        }
    const onSelectAll =
        (key: BoardParticipantKey) => (participants: IParticipants[]) => {
            setData({
                ...data,
                [key]: [...participants],
            })
        }
    const onDelete =
        (key: BoardParticipantKey) => (participants: IParticipants) => {
            setData({
                ...data,
                [key]: data[key].filter(
                    (p) => p.users_id !== participants.users_id,
                ),
            })
        }

    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid min-h-[220px] grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ParticipantSelector
                    title={t('HOST')}
                    selectedParticipants={data.hosts}
                    onSelectParticipant={onSelect('hosts')}
                    onSelectAllParticipants={onSelectAll('hosts')}
                    onDeleteParticipant={onDelete('hosts')}
                />
                <ParticipantSelector
                    title={t('CONTROL_BOARD')}
                    selectedParticipants={data.controlBoards}
                    onSelectParticipant={onSelect('controlBoards')}
                    onSelectAllParticipants={onSelectAll('controlBoards')}
                    onDeleteParticipant={onDelete('controlBoards')}
                />
                <ParticipantSelector
                    title={t('DIRECTOR_GENERAL')}
                    selectedParticipants={data.directors}
                    onSelectParticipant={onSelect('directors')}
                    onSelectAllParticipants={onSelectAll('directors')}
                    onDeleteParticipant={onDelete('directors')}
                />
                <ParticipantSelector
                    title={t('ADMINISTRATIVE_COUNCIL')}
                    selectedParticipants={data.administrativeCouncils}
                    onSelectParticipant={onSelect('administrativeCouncils')}
                    onSelectAllParticipants={onSelectAll(
                        'administrativeCouncils',
                    )}
                    onDeleteParticipant={onDelete('administrativeCouncils')}
                />
            </div>
        </BoxArea>
    )
}

export default BoardMeetingParticipants
