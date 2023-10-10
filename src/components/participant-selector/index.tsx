/* eslint-disable */
import SelectParticipantGroup from '@/components/participant-selector/select-participant-group'
import SelectedParticipantList from '@/components/participant-selector/selected-participant-list'
import { Typography } from 'antd'

const { Text } = Typography

export interface IParticipants {
    defaultAvatarHashColor: string
    avatar?: string
    username: string
    id: number
}

interface IParticipantSelector {
    title: string
    selectedParticipants: IParticipants[]
    onSelectParticipant: (p: IParticipants) => void
    onDeleteParticipant: (p: IParticipants) => void
}

const ParticipantSelector = ({
    title,
    selectedParticipants,
    onSelectParticipant,
    onDeleteParticipant,
}: IParticipantSelector) => {
    return (
        <div className="max-w-sm">
            <Text className="text-sm">{title}</Text>
            <SelectParticipantGroup onSelectParticipant={onSelectParticipant} />
            <SelectedParticipantList
                selectedParticipants={selectedParticipants}
                onDeleteParticipant={onDeleteParticipant}
            />
        </div>
    )
}

export default ParticipantSelector
