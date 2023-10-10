import { IParticipants } from '@/components/participant-selector'
import { truncateString } from '@/utils/format-string'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { Avatar, Typography } from 'antd'
import Color from 'color'

const { Text } = Typography

interface IParticipantOptionItem extends IParticipants {
    onSelectParticipant: () => void
}

const ParticipantOptionItem = ({
    defaultAvatarHashColor,
    username,
    avatar,
    onSelectParticipant,
}: IParticipantOptionItem) => {
    const backgroundAvatarColor = Color(defaultAvatarHashColor)
        .lighten(0.6)
        .hex()

    return (
        <div
            className="flex cursor-pointer items-center justify-between p-1 transition-colors hover:bg-neutral/4 "
            onClick={onSelectParticipant}
        >
            <div className="flex items-center gap-2">
                {avatar ? (
                    <Avatar
                        src={avatar}
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
                            color: defaultAvatarHashColor,
                        }}
                        size="small"
                    >
                        {getFirstCharacterUpperCase(username)}
                    </Avatar>
                )}

                <Text title={username} className="cursor-pointer">
                    {truncateString({ text: username, start: 15, end: 0 })}
                </Text>
            </div>
        </div>
    )
}

export default ParticipantOptionItem
