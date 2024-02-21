import BoxArea from '@/components/box-area'
import ParticipantSelector, {
    IParticipants,
} from '@/components/participant-selector'
import serviceSettingRole from '@/services/setting-role'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import { notification } from 'antd'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

// const data: IParticipants[] = [
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.VOLCANO,
//         name: 'phuong naphuong naphuong naphuong naphuong naphuong naphuong naphuong na',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
//         name: 'kien na',
//         avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.CYAN,
//         name: 'quang na',
//         avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.CYAN,
//         name: 'huy na',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.CYAN,
//         name: 'phuong naphuong naphuong naphuong naphuong naphuong naphuong naphuong na',
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
//         name: 'minh na',
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.VOLCANO,
//         name: 'quang na',
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
//         name: 'vuong na',
//     },
// ]

const Participants = () => {
    const t = useTranslations()
    const [normalRole, setNormalRole] = useState<
        { id: number; roleName: string }[]
    >([])

    const [data, setData] = useCreateMeetingInformation()

    useEffect(() => {
        // eslint-disable-next-line
        ;(async () => {
            try {
                const normalRoleResponse =
                    await serviceSettingRole.getAllNormalRoles(1, 100)
                const normalRoleList = normalRoleResponse.items.map((item) => ({
                    id: item.id,
                    roleName: item.roleName,
                }))
                setNormalRole(normalRoleList)
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: t('ERROR'),
                        description: error.response?.data.info.message,
                    })
                }
            }
        })()
    }, [t])

    const onSelect = (key: string) => (participant: IParticipants) => {
        const dataParticipant = data.participants[key] || []
        const isNotExited =
            dataParticipant.findIndex(
                (p) => p.users_id === participant.users_id,
            ) < 0
        if (isNotExited) {
            setData({
                ...data,
                participants: {
                    ...data.participants,
                    [key]: [...dataParticipant, participant],
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
                {normalRole.map((item) => {
                    return (
                        <ParticipantSelector
                            key={item.id}
                            title={item.roleName}
                            selectedParticipants={
                                data.participants[item.roleName] || []
                            }
                            onSelectParticipant={onSelect(item.roleName)}
                            onSelectAllParticipants={onSelectAll(item.roleName)}
                            onDeleteParticipant={onDelete(item.roleName)}
                        />
                    )
                })}
            </div>
        </BoxArea>
    )
}

export default Participants
