import BoxArea from '@/components/box-area'
import ParticipantDetail, {
    IParticipants,
} from '@/components/participants-detail'
import { AvatarBgHexColors } from '@/constants/common'
import { useTranslations } from 'next-intl'

const data: IParticipants[] = [
    {
        defaultAvatarHashColor: AvatarBgHexColors.VOLCANO,
        name: 'phuong naphuong naphuong naphuong naphuong naphuong naphuong naphuong na',
        joined: true,
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
        name: 'kien na',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
        joined: false,
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.CYAN,
        name: 'quang na',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2',
        joined: true,
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.CYAN,
        name: 'huy na',
        joined: true,
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.CYAN,
        name: 'phuong naphuong naphuong naphuong naphuong naphuong naphuong naphuong na',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        joined: true,
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
        name: 'minh na',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        joined: true,
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.VOLCANO,
        name: 'quang na',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        joined: false,
    },
    {
        defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
        name: 'vuong na',
        joined: false,
    },
]

const Participants = () => {
    const t = useTranslations()

    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <ParticipantDetail
                    title={t('HOST')}
                    participantList={data.slice(0, 4)}
                />
                <ParticipantDetail
                    title={t('CONTROL_BOARD')}
                    participantList={data.slice(4, 6)}
                />
                <ParticipantDetail
                    title={t('DIRECTOR_GENERAL')}
                    participantList={data.slice(2, 8)}
                />
                <ParticipantDetail
                    title={t('ADMINISTRATIVE_COUNCIL')}
                    participantList={data.slice(1, 6)}
                />
                <ParticipantDetail
                    title={t('SHAREHOLDERS')}
                    participantList={data}
                />
            </div>
        </BoxArea>
    )
}

export default Participants
