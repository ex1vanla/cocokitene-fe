/* eslint-disable */

import { MessageTwoTone, SendOutlined } from '@ant-design/icons'
import { Modal, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ChangeEvent, useMemo, useState } from 'react'
import {
    MessageChatItemFromYou,
    MessageChatItemToYou,
} from './message-chat-item'
import { useAuthLogin } from '@/stores/auth/hooks'

const fakeDataChat: { from: string; to: string; message: string }[] = [
    {
        from: 'nva01@gmail.com',
        to: 'tiennv@trithucmoi.co',
        message: 'Test Chat Item',
    },
    {
        from: 'nva01@gmail.com',
        to: 'everyone',
        message:
            'Test Chat Item2 Test Chat Item2 Test Chat Item2 Test Chat Item2 Test Chat Item2',
    },
    {
        from: 'nva01@gmail.com',
        to: 'everyone',
        message: 'Test Chat Item3',
    },
    {
        from: 'nva02@gmail.com',
        to: 'tiennv@trithucmoi.co',
        message: 'Test Chat Item4',
    },
    {
        from: 'nva02@gmail.com',
        to: 'everyone',
        message: 'Test Chat Item5',
    },
    {
        from: 'nva02@gmail.com',
        to: 'everyone',
        message: 'Test Chat Item6',
    },
    {
        from: 'nva01@gmail.com',
        to: 'everyone',
        message: 'Test Chat Item7',
    },
    {
        from: 'nva01@gmail.com',
        to: 'everyone',
        message: 'Test Chat Item7',
    },
    {
        from: 'nva01@gmail.com',
        to: 'everyone',
        message: 'Test Chat Item7',
    },
    {
        from: 'nva02@gmail.com',
        to: 'nva01@gmail.com',
        message: 'Test Chat Item7',
    },
]

interface IParticipantDetail1 {
    userId: number
    avatar?: string
    userEmail: string
    shareQuantity?: number | null
}

interface IParticipantDetail {
    roleMtgId: number
    roleMtgName: string
    userParticipants: IParticipantDetail1[]
}

interface IMeetingInfo {
    id: number
    title: string
    participants: IParticipantDetail[]
}

interface IMeetingChat {
    meetingInfo: IMeetingInfo
}

const MeetingChat = ({ meetingInfo }: IMeetingChat) => {
    const { authState } = useAuthLogin()

    const [chatModalOpen, setChatModalOpen] = useState<boolean>(false)
    const [valueMessage, setValueMessage] = useState<string>('')
    const [sendToUser, setSendToUser] = useState<number>(0)

    const userJoinChat = useMemo(() => {
        const participant = meetingInfo.participants
            .map((participant) => participant.userParticipants)
            .flatMap((user) => user)

        const cachedObject: {
            [key in string]: boolean
        } = {}
        const uniqueParticipant = participant.filter((obj) => {
            if (
                !cachedObject[obj.userId] &&
                obj.userId !== authState.userData?.id
            ) {
                cachedObject[obj.userId] = true
                return true
            }
            return false
        })

        return [
            {
                userId: '0',
                userEmail: 'EveryOne',
            },
            ...uniqueParticipant,
        ]
    }, [...meetingInfo.participants])

    const toggleModelDetailResolution = () => {
        setChatModalOpen(!chatModalOpen)
    }

    const onChange = (value: string) => {
        setSendToUser(+value)
    }

    //
    const choiceSendMessageTo = (e: string) => {
        const idOfUserToSendMessage = userJoinChat.find(
            (user) => user.userEmail.toLowerCase() == e.toLowerCase(),
        )
        if (idOfUserToSendMessage) {
            setSendToUser(+idOfUserToSendMessage.userId)
        }
    }

    const filterOption = (
        input: string,
        option?: { label: string; value: string },
    ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

    const pressMessageChat = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValueMessage(e.target.value)
    }

    const sendMessage = () => {
        console.log(`Send Message to ${sendToUser} message : ${valueMessage}`)
        setValueMessage('')
    }

    return (
        <div className="fixed bottom-7 right-5">
            <Modal
                open={chatModalOpen}
                onCancel={toggleModelDetailResolution}
                footer={[]}
            >
                <div className="flex h-[600px] flex-col gap-2">
                    <div className="flex h-[5%] items-center justify-center gap-2">
                        <div className="text-xl font-medium">
                            Chat {meetingInfo.title}
                        </div>
                    </div>
                    <div className="border-black-500 over h-[77%] overflow-y-auto border p-2">
                        {fakeDataChat.map((message, index) => {
                            if (
                                message.from.toLowerCase() ==
                                authState.userData?.email.toLowerCase()
                            ) {
                                return (
                                    <MessageChatItemFromYou
                                        key={index}
                                        from={message.from}
                                        to={message.to}
                                        message={message.message}
                                        messageInfoPrev={
                                            fakeDataChat[index - 1]
                                        }
                                        setSentUserTo={choiceSendMessageTo}
                                    />
                                )
                            }

                            return (
                                <MessageChatItemToYou
                                    key={index}
                                    from={message.from}
                                    to={
                                        message.to.toLowerCase() ==
                                        authState.userData?.email.toLowerCase()
                                            ? 'You'
                                            : message.to
                                    }
                                    message={message.message}
                                    messageInfoPrev={fakeDataChat[index - 1]}
                                    setSentUserTo={choiceSendMessageTo}
                                />
                            )
                        })}
                    </div>
                    <div className="flex h-[15%] gap-5">
                        <div className="flex w-[95%] flex-col gap-2">
                            <div>
                                <span>To : </span>
                                <Select
                                    defaultValue={'0'}
                                    value={String(sendToUser)}
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    // onSearch={onSearch}
                                    filterOption={filterOption}
                                    options={userJoinChat.map((user) => ({
                                        value: user.userId + '',
                                        label: user.userEmail,
                                    }))}
                                    size={'small'}
                                    className="w-[50%] rounded-[7px]"
                                />
                            </div>

                            <div className="flex w-full items-center gap-5">
                                <TextArea
                                    value={valueMessage}
                                    onChange={(e) => pressMessageChat(e)}
                                    placeholder="Please input message"
                                    autoSize={{ minRows: 2, maxRows: 2 }}
                                    onKeyUp={(e) => {
                                        if (e.keyCode == 13 && !e.shiftKey) {
                                            sendMessage()
                                        }
                                        if (e.keyCode == 13 && e.shiftKey) {
                                            console.log('Shift + Enter Key!!!!')
                                        }
                                    }}
                                />
                                <SendOutlined
                                    style={{
                                        fontSize: '22px',
                                        color: '#5151e5',
                                    }}
                                    onClick={sendMessage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <MessageTwoTone
                twoToneColor="#5151e5"
                style={{ fontSize: '48px' }}
                onClick={toggleModelDetailResolution}
            />
        </div>
    )
}

export default MeetingChat
