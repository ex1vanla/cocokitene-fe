/* eslint-disable */
import SelectParticipantGroup from '@/components/participant-selector/select-participant-group'
import SelectedParticipantList from '@/components/participant-selector/selected-participant-list'
import { Typography } from 'antd'
import { UserStatus } from '@/constants/user-status'
import { useTranslations } from 'next-intl'

const { Text } = Typography

export interface IParticipants {
    users_defaultAvatarHashColor: string
    users_avartar?: string
    users_username: string
    users_id: number
    userStatus_status?: string
}

export interface IParticipantCustom extends IParticipants {
    listRoleResponse: string
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
    const t = useTranslations()

    return (
        <div className="max-w-sm">
            <Text className="text-sm">{t(title)}</Text>
            <SelectParticipantGroup
                title={title}
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
