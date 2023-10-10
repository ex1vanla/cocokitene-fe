/* eslint-disable */
import { IParticipants } from '@/components/participant-selector'
import SelectedParticipantItem from '@/components/participant-selector/selected-participant-item'

interface ISelectedParticipantList {
    selectedParticipants: IParticipants[]
    onDeleteParticipant: (p: IParticipants) => void
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
                    id={participant.id}
                    username={participant.username}
                    defaultAvatarHashColor={participant.defaultAvatarHashColor}
                    avatar={participant.avatar}
                    onDeleteParticipant={() => onDeleteParticipant(participant)}
                />
            ))}
        </div>
    )
}

export default SelectedParticipantList
