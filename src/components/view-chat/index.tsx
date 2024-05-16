/* eslint-disable */

import { MessageTwoTone, SendOutlined } from '@ant-design/icons'
import { Modal, Row, Select, Spin, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
    MessageChatItemFromYou,
    MessageChatItemToYou,
} from './message-chat-item'
import { useAuthLogin } from '@/stores/auth/hooks'
import { DataMessageChat } from '@/services/response.type'
import { FETCH_STATUS } from '@/constants/common'
import serviceChatMeeting from '@/services/chat-meeting'

interface IParticipantDetail {
    roleMtgId: number
    roleMtgName: string
    userParticipants: {
        userId: number
        avatar?: string
        userEmail: string
    }[]
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

    const [dataChat, setDataChat] = useState<{
        roomChat: number
        messageChat: DataMessageChat[]
    }>()
    const [chatModalOpen, setChatModalOpen] = useState<boolean>(false)
    const [valueMessage, setValueMessage] = useState<string>('')
    const [sendToUser, setSendToUser] = useState<number>(0)
    const [initStatus, setInitStatus] = useState<FETCH_STATUS>(
        FETCH_STATUS.IDLE,
    )

    console.log('dataChat', dataChat)

    useEffect(() => {
        const fetchDataChat = async (meetingId: number) => {
            setInitStatus(FETCH_STATUS.LOADING)
            try {
                const res =
                    await serviceChatMeeting.getAllMessageChatByMeetingId(
                        meetingId,
                    )
                if (res) {
                    setDataChat({
                        ...res,
                        messageChat: res.messageChat.map((message) => ({
                            ...message,
                            receiverId: message.receiverId
                                ? message.receiverId
                                : 0,
                        })),
                    })
                    setInitStatus(FETCH_STATUS.SUCCESS)
                }
            } catch (error) {}
        }

        if (meetingInfo.id) {
            fetchDataChat(meetingInfo.id)
        }
    }, [meetingInfo.id])

    const participantToSendMessage = useMemo(() => {
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

    const participantJoinChat = useMemo((): { [key in number]: string } => {
        const participant = meetingInfo.participants
            .map((participant) => participant.userParticipants)
            .flatMap((user) => user)

        const cachedObject: {
            [key in string]: string
        } = {}
        participant.forEach((obj) => {
            if (!cachedObject[obj.userId]) {
                cachedObject[obj.userId] = obj.userEmail
            }
        })

        return {
            0: 'EveryOne',
            ...cachedObject,
        }
    }, [...meetingInfo.participants])

    console.log('participantJoinChat: ', participantJoinChat)

    const toggleModelDetailResolution = () => {
        setChatModalOpen(!chatModalOpen)
    }

    const onChange = (value: string) => {
        setSendToUser(+value)
    }

    //
    const choiceSendMessageTo = (e: string) => {
        const idOfUserToSendMessage = participantToSendMessage.find(
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
                    {initStatus === FETCH_STATUS.LOADING ? (
                        <Row
                            align={'middle'}
                            justify={'center'}
                            style={{ height: '40vh' }}
                        >
                            <Spin tip="Loading..." />
                        </Row>
                    ) : (
                        <>
                            <div className="flex h-[5%] items-center justify-center gap-2">
                                <div className="text-xl font-medium">
                                    Chat {meetingInfo.title}
                                </div>
                            </div>
                            <div className="border-black-500 over h-[77%] overflow-y-auto border p-2">
                                {dataChat?.messageChat.map((message, index) => {
                                    if (
                                        message.senderId ==
                                        authState.userData?.id
                                    ) {
                                        return (
                                            <MessageChatItemFromYou
                                                key={index}
                                                from={
                                                    participantJoinChat[
                                                        message.senderId
                                                    ]
                                                }
                                                to={
                                                    participantJoinChat[
                                                        message.receiverId
                                                    ]
                                                }
                                                message={message.content}
                                                messageInfoPrev={{
                                                    from: participantJoinChat[
                                                        dataChat.messageChat[
                                                            index - 1
                                                        ]?.senderId
                                                    ],
                                                    to: participantJoinChat[
                                                        dataChat.messageChat[
                                                            index - 1
                                                        ]?.receiverId
                                                    ],
                                                }}
                                                setSentUserTo={
                                                    choiceSendMessageTo
                                                }
                                            />
                                        )
                                    }

                                    return (
                                        <MessageChatItemToYou
                                            key={index}
                                            from={
                                                participantJoinChat[
                                                    message.senderId
                                                ]
                                            }
                                            to={
                                                participantJoinChat[
                                                    message.receiverId
                                                ].toLowerCase() ==
                                                authState.userData?.email.toLowerCase()
                                                    ? 'You'
                                                    : participantJoinChat[
                                                          message.receiverId
                                                      ]
                                            }
                                            message={message.content}
                                            messageInfoPrev={{
                                                from: participantJoinChat[
                                                    dataChat.messageChat[
                                                        index - 1
                                                    ]?.senderId
                                                ],
                                                to: participantJoinChat[
                                                    dataChat.messageChat[
                                                        index - 1
                                                    ]?.receiverId
                                                ],
                                            }}
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
                                            options={participantToSendMessage.map(
                                                (user) => ({
                                                    value: user.userId + '',
                                                    label: user.userEmail,
                                                }),
                                            )}
                                            size={'small'}
                                            className="w-[50%] rounded-[7px]"
                                        />
                                    </div>

                                    <div className="flex w-full items-center gap-5">
                                        <TextArea
                                            value={valueMessage}
                                            onChange={(e) =>
                                                pressMessageChat(e)
                                            }
                                            placeholder="Please input message"
                                            autoSize={{
                                                minRows: 2,
                                                maxRows: 2,
                                            }}
                                            onKeyUp={(e) => {
                                                if (
                                                    e.keyCode == 13 &&
                                                    !e.shiftKey
                                                ) {
                                                    sendMessage()
                                                }
                                                if (
                                                    e.keyCode == 13 &&
                                                    e.shiftKey
                                                ) {
                                                    console.log(
                                                        'Shift + Enter Key!!!!',
                                                    )
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
                        </>
                    )}
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
