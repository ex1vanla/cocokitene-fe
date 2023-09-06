import BoxArea from '@/components/box-area'
import ParticipantSelector, {
    IParticipants,
} from '@/components/participant-selector'
import { AvatarBgHexColors } from '@/constants/common'
import { useTranslations } from 'next-intl'

const data: IParticipants[] = [
    {
        defaultAvatarHashColor: AvatarBgHexColors.VOLCANO,
        name: 'phuong naphuong naphuong naphuong naphuong naphuong naphuong naphuong na',
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
        name: 'kien na',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.CYAN,
        name: 'quang na',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2',
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.CYAN,
        name: 'huy na',
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.CYAN,
        name: 'phuong naphuong naphuong naphuong naphuong naphuong naphuong naphuong na',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
        name: 'minh na',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.VOLCANO,
        name: 'quang na',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
        name: 'vuong na',
    },
]

const Participants = () => {
    const t = useTranslations()

    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <ParticipantSelector
                    title={t('HOST')}
                    selectedParticipants={data.slice(0, 4)}
                    onSelectParticipant={() => {}}
                    onDeleteParticipant={() => {}}
                />
                <ParticipantSelector
                    title={t('CONTROL_BOARD')}
                    selectedParticipants={data.slice(4, 6)}
                    onSelectParticipant={() => {}}
                    onDeleteParticipant={() => {}}
                />
                <ParticipantSelector
                    title={t('DIRECTOR_GENERAL')}
                    selectedParticipants={data.slice(2, 8)}
                    onSelectParticipant={() => {}}
                    onDeleteParticipant={() => {}}
                />
                <ParticipantSelector
                    title={t('ADMINISTRATIVE_COUNCIL')}
                    selectedParticipants={data.slice(1, 6)}
                    onSelectParticipant={() => {}}
                    onDeleteParticipant={() => {}}
                />
                <ParticipantSelector
                    title={t('SHAREHOLDERS')}
                    selectedParticipants={data}
                    onSelectParticipant={() => {}}
                    onDeleteParticipant={() => {}}
                />
            </div>
        </BoxArea>
    )
}

export default Participants
