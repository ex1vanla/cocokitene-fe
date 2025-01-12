import { IParticipants } from '@/components/participant-selector'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { CloseCircleFilled } from '@ant-design/icons'
import { Avatar, Typography } from 'antd'
import Color from 'color'

const { Text } = Typography

interface ISelectedParticipantItem extends IParticipants {
    onDeleteParticipant: () => void
    roleName?: string
}

const SelectedParticipantItem = ({
    users_defaultAvatarHashColor,
    users_email,
    users_avartar,
    onDeleteParticipant,
    disable_delete,
}: ISelectedParticipantItem) => {
    const backgroundAvatarColor = Color(users_defaultAvatarHashColor)
        .lighten(0.6)
        .hex()

    return (
        <div className="flex items-center justify-between">
            <div className="flex w-[80%] items-center gap-2">
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
                    className="w-[70%] cursor-pointer truncate"
                >
                    {users_email}
                </Text>
            </div>
            <CloseCircleFilled
                className={`text-black-25 ${
                    disable_delete ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                width={14}
                height={14}
                onClick={onDeleteParticipant}
            />
        </div>
    )
}

export default SelectedParticipantItem
