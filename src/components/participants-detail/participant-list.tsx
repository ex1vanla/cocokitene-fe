import { IParticipants } from '@/components/participants-detail'
import ParticipantItem from '@/components/participants-detail/participant-item'

interface IParticipantList {
    participantList: IParticipants[]
}

const ParticipantList = ({ participantList }: IParticipantList) => {
    return (
        <div className="mt-2 flex flex-col gap-2">
            {participantList.map((participant, index) => (
                <ParticipantItem
                    key={index}
                    name={participant.name}
                    defaultAvatarHashColor={participant.defaultAvatarHashColor}
                    avatar={participant.avatar}
                    joined={participant.joined}
                />
            ))}
        </div>
    )
}

export default ParticipantList
