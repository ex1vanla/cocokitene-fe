import { IParticipants } from '@/components/participant-selector'
import { truncateString } from '@/utils/format-string'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { CloseCircleFilled } from '@ant-design/icons'
import { Avatar, Typography } from 'antd'
import Color from 'color'

const { Text } = Typography

interface ISelectedParticipantItem extends IParticipants {
    onDeleteParticipant: () => void
}

const SelectedParticipantItem = ({
    defaultAvatarHashColor,
    name,
    avatar,
    onDeleteParticipant,
}: ISelectedParticipantItem) => {
    const backgroundAvatarColor = Color(defaultAvatarHashColor)
        .lighten(0.6)
        .hex()

    return (
        <div className="flex items-center justify-between">
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
                        {getFirstCharacterUpperCase(name)}
                    </Avatar>
                )}

                <Text title={name} className="cursor-pointer">
                    {truncateString({ text: name, start: 15, end: 0 })}
                </Text>
            </div>
            <CloseCircleFilled
                className="cursor-pointer text-black-25"
                width={14}
                height={14}
                onClick={onDeleteParticipant}
            />
        </div>
    )
}

export default SelectedParticipantItem
