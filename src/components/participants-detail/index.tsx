import ParticipantList from '@/components/participants-detail/participant-list'
import { Typography } from 'antd'

const { Text } = Typography

export interface IParticipants {
    defaultAvatarHashColor: string
    avatar?: string
    name: string
    joined: boolean
}

interface IParticipantDetail {
    title: string
    participantList: IParticipants[]
}

const ParticipantDetail = ({ title, participantList }: IParticipantDetail) => {
    return (
        <div className="flex max-w-sm flex-col gap-4">
            <Text className="text-sm">{title}</Text>
            <ParticipantList participantList={participantList} />
        </div>
    )
}

export default ParticipantDetail