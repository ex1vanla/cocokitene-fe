import { IParticipants } from '@/components/participant-selector'
import SelectedParticipantItem from '@/components/participant-selector/selected-participant-item'

interface ISelectedParticipantList {
    selectedParticipants: IParticipants[]
    onDeleteParticipant: () => void
}

const SelectedParticipantList = ({
    selectedParticipants,
    onDeleteParticipant,
}: ISelectedParticipantList) => {
    return (
        <div className="mt-2 flex flex-col gap-2">
            {selectedParticipants.map((participant, index) => (
                <SelectedParticipantItem
                    key={index}
                    name={participant.name}
                    defaultAvatarHashColor={participant.defaultAvatarHashColor}
                    avatar={participant.avatar}
                    onDeleteParticipant={onDeleteParticipant}
                />
            ))}
        </div>
    )
}

export default SelectedParticipantList
