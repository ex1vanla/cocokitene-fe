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
    onSelectAllParticipants: (p: IParticipants[]) => void
    onDeleteParticipant: (p: IParticipants) => void
}

const ParticipantSelector = ({
    title,
    selectedParticipants,
    onSelectParticipant,
    onSelectAllParticipants,
    onDeleteParticipant,
}: IParticipantSelector) => {
    return (
        <div className="max-w-sm">
            <Text className="text-sm">{title}</Text>
            <SelectParticipantGroup
                selectedParticipants={selectedParticipants}
                onSelectParticipant={onSelectParticipant}
                onSelectAllParticipants={onSelectAllParticipants}
            />
            <SelectedParticipantList
                selectedParticipants={selectedParticipants}
                onDeleteParticipant={onDeleteParticipant}
            />
        </div>
    )
}

export default ParticipantSelector
