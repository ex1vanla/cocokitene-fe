import { IParticipants } from '@/components/participant-selector'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { Avatar, Typography } from 'antd'
import Color from 'color'

const { Text } = Typography

interface IParticipantOptionItem extends IParticipants {
    onSelectParticipant: () => void
    selected: boolean
    roleName?: string
}

const ParticipantOptionItem = ({
    users_defaultAvatarHashColor = '#E57B41',
    users_email,
    users_avartar,
    onSelectParticipant,
    selected,
}: IParticipantOptionItem) => {
    const backgroundAvatarColor = Color(users_defaultAvatarHashColor)
        .lighten(0.6)
        .hex()

    return (
        <div
            className={`flex cursor-pointer items-center justify-between  p-1 transition-colors ${
                selected && 'selected bg-neutral/5'
            } [&:not(.selected)]:hover:bg-neutral/4 `}
            onClick={onSelectParticipant}
        >
            <div className="flex w-full items-center gap-2">
                {users_avartar ? (
                    <Avatar
                        src={
                            process.env.NEXT_PUBLIC_PRE_URL_S3_LINK +
                            users_avartar
                        }
                        alt="avatar-alt"
                        size="small"
                        style={{
                            backgroundColor: backgroundAvatarColor,
                            verticalAlign: 'middle',
                        }}
                    />
                ) : (
                    <Avatar
                        style={{
                            backgroundColor: backgroundAvatarColor,
                            verticalAlign: 'middle',
                            color: users_defaultAvatarHashColor,
                        }}
                        size="small"
                    >
                        {getFirstCharacterUpperCase(users_email)}
                    </Avatar>
                )}

                <Text
                    title={users_email}
                    className="w-[80%] cursor-pointer truncate"
                >
                    {users_email}
                </Text>
            </div>
        </div>
    )
}

export default ParticipantOptionItem
