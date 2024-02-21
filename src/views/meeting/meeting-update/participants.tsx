import BoxArea from '@/components/box-area'
import ParticipantSelector, {
    IParticipants,
} from '@/components/participant-selector'
import { useUpdateMeetingInformation } from '@/stores/meeting/hooks'
import { useTranslations } from 'next-intl'

const Participants = () => {
    const t = useTranslations()

    const [data, setData] = useUpdateMeetingInformation()

    const onSelect = (key: string) => (participant: IParticipants) => {
        const isNotExited =
            data.participants[key].findIndex(
                (p) => p.users_id === participant.users_id,
            ) < 0
        if (isNotExited) {
            setData({
                ...data,
                participants: {
                    ...data.participants,
                    [key]: [...data.participants[key], participant],
                },
            })
        }
    }

    const onSelectAll = (key: string) => (participants: IParticipants[]) => {
        setData({
            ...data,
            participants: { ...data.participants, [key]: [...participants] },
        })
    }

    const onDelete = (key: string) => (participant: IParticipants) => {
        setData({
            ...data,
            participants: {
                ...data.participants,
                [key]: data.participants[key].filter(
                    (p) => p.users_id !== participant.users_id,
                ),
            },
        })
    }
    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid min-h-[220px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Object.keys(data.participants).map((item) => {
                    return (
                        <ParticipantSelector
                            key={item}
                            title={item}
                            selectedParticipants={data.participants[item] || []}
                            onSelectParticipant={onSelect(item)}
                            onSelectAllParticipants={onSelectAll(item)}
                            onDeleteParticipant={onDelete(item)}
                        />
                    )
                })}
            </div>
        </BoxArea>
    )
}

export default Participants
