'use client'
/* eslint-disable */

import {
    CloseOutlined,
    MessageTwoTone,
    MinusOutlined,
    SendOutlined,
} from '@ant-design/icons'
import { Modal, Row, Select, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ChangeEvent, useEffect, useMemo, useState, useRef } from 'react'
import {
    MessageChatItemFromYou,
    MessageChatItemToYou,
} from './message-chat-item'
import { useAuthLogin } from '@/stores/auth/hooks'
import { DataMessageChat } from '@/services/response.type'
import { FETCH_STATUS } from '@/constants/common'
import serviceChatMeeting from '@/services/chat-meeting'
// Socket
import { io } from 'socket.io-client'

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
    const bottomOfMessageChat = useRef<null | HTMLElement>(null)

    const { authState } = useAuthLogin()

    const [scrollToBottom, setScrollToBottom] = useState<boolean>(false)
    const [dataChat, setDataChat] = useState<{
        roomChat: number
        messageChat: DataMessageChat[]
    }>({
        roomChat: meetingInfo.id,
        messageChat: [],
    })
    const [chatModalOpen, setChatModalOpen] = useState<boolean>(false)
    const [valueMessage, setValueMessage] = useState<string>('')
    const [sendToUser, setSendToUser] = useState<number>(0)
    const [initStatus, setInitStatus] = useState<FETCH_STATUS>(
        FETCH_STATUS.IDLE,
    )

    //Socket
    const [socket, setSocket] = useState<any>(undefined)

    //Scroll to bottom of chat

    useEffect(() => {
        const socket = io(String(process.env.NEXT_PUBLIC_API_SOCKET))

        socket.on('receive_chat_public', (message) => {
            console.log('message: ', message)

            setDataChat((prev) => {
                return {
                    roomChat: prev.roomChat,
                    messageChat: [
                        ...prev.messageChat,
                        {
                            ...message,
                            receiverId: message.receiverId
                                ? message.receiverId
                                : 0,
                        },
                    ],
                }
            })
        })
        setSocket(socket)
    }, [])

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

    useEffect(() => {
        if (scrollToBottom) {
            bottomOfMessageChat.current?.scrollIntoView({ behavior: 'smooth' })
            setScrollToBottom(false)
        }
    }, [scrollToBottom])

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

    const toggleModelDetailResolution = () => {
        if (!chatModalOpen) {
            console.log('Scroll bottom chat')
            // bottomOfMessageChat.current?.scrollIntoView({ behavior: 'smooth' })
            bottomOfMessageChat.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
            })
        }
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
        const idSender = authState.userData?.id
        const receiverId = sendToUser == 0 ? null : sendToUser

        console.log('receiverId: ', receiverId)

        if (idSender) {
            // console.log(
            //     `Send Message to ${sendToUser} message : ${valueMessage}`,
            // )
            socket.emit('send_chat_public', {
                meetingId: meetingInfo.id,
                receiverId: sendToUser == 0 ? null : sendToUser,
                senderId: idSender,
                content: valueMessage,
            })

            setDataChat((prev) => {
                return {
                    roomChat: prev.roomChat,
                    messageChat: [
                        ...prev.messageChat,
                        {
                            senderId: idSender,
                            receiverId: sendToUser,
                            content: valueMessage,
                            createdAt: '',
                        },
                    ],
                }
            })

            setScrollToBottom(true)
        } else {
            console.log('Send message chat failed!!! UnAuthor')
        }
        setValueMessage('')
    }

    return (
        <>
            <div className="fixed bottom-7 right-5">
                {/* <Modal
                    open={chatModalOpen}
                    onCancel={toggleModelDetailResolution}
                    footer={[]}
                > */}

                {/* {chatModalOpen && ( */}
                <div
                    className={`mb-14 mr-3 border bg-white ${
                        chatModalOpen
                            ? 'animate-message-chat-move-left'
                            : 'animate-message-chat-move-right'
                    }`}
                >
                    <div className="flex h-[600px] w-[400px] flex-col">
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
                                <div className="relative flex h-[7%] w-full items-center bg-[#5151e5] px-2">
                                    <span className="text-xl font-medium text-[#ffffff]">
                                        Chat {meetingInfo.title}
                                    </span>
                                    <MinusOutlined
                                        className="absolute right-1 top-[5px]"
                                        onClick={toggleModelDetailResolution}
                                        style={{
                                            fontSize: '22px',
                                            color: '#ffffff',
                                        }}
                                    />
                                </div>
                                <div className="h-[77%] p-2">
                                    <div className="border-black-500 h-full overflow-hidden border px-2 hover:overflow-y-auto">
                                        {dataChat?.messageChat.map(
                                            (message, index) => {
                                                if (
                                                    message.senderId ==
                                                    authState.userData?.id
                                                ) {
                                                    return (
                                                        <MessageChatItemFromYou
                                                            key={index}
                                                            from={
                                                                participantJoinChat[
                                                                    message
                                                                        .senderId
                                                                ]
                                                            }
                                                            to={
                                                                participantJoinChat[
                                                                    message
                                                                        .receiverId
                                                                ]
                                                            }
                                                            message={
                                                                message.content
                                                            }
                                                            messageInfoPrev={{
                                                                from: participantJoinChat[
                                                                    dataChat
                                                                        .messageChat[
                                                                        index -
                                                                            1
                                                                    ]?.senderId
                                                                ],
                                                                to: participantJoinChat[
                                                                    dataChat
                                                                        .messageChat[
                                                                        index -
                                                                            1
                                                                    ]
                                                                        ?.receiverId
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
                                                                message
                                                                    .receiverId
                                                            ].toLowerCase() ==
                                                            authState.userData?.email.toLowerCase()
                                                                ? 'You'
                                                                : participantJoinChat[
                                                                      message
                                                                          .receiverId
                                                                  ]
                                                        }
                                                        message={
                                                            message.content
                                                        }
                                                        messageInfoPrev={{
                                                            from: participantJoinChat[
                                                                dataChat
                                                                    .messageChat[
                                                                    index - 1
                                                                ]?.senderId
                                                            ],
                                                            to:
                                                                participantJoinChat[
                                                                    dataChat
                                                                        .messageChat[
                                                                        index -
                                                                            1
                                                                    ]
                                                                        ?.receiverId
                                                                ] ==
                                                                authState
                                                                    .userData
                                                                    ?.email
                                                                    ? 'You'
                                                                    : participantJoinChat[
                                                                          dataChat
                                                                              .messageChat[
                                                                              index -
                                                                                  1
                                                                          ]
                                                                              ?.receiverId
                                                                      ],
                                                        }}
                                                        setSentUserTo={
                                                            choiceSendMessageTo
                                                        }
                                                    />
                                                )
                                            },
                                        )}
                                        <span ref={bottomOfMessageChat}></span>
                                    </div>
                                </div>
                                <div className="flex h-[15%] gap-5 px-2">
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
                </div>
                {/* )} */}
                {/* </Modal> */}

                <MessageTwoTone
                    twoToneColor="#5151e5"
                    style={{ fontSize: '48px' }}
                    onClick={toggleModelDetailResolution}
                    className="absolute bottom-0 right-0"
                />
            </div>
        </>
    )
}

export default MeetingChat
