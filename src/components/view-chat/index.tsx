'use client'
/* eslint-disable */

import { FETCH_STATUS } from '@/constants/common'
import serviceChatMeeting from '@/services/chat-meeting'
import { DataMessageChat, ReactionMessage } from '@/services/response.type'
import { useAuthLogin } from '@/stores/auth/hooks'
import {
    CheckOutlined,
    MessageTwoTone,
    MinusOutlined,
    MoreOutlined,
    SendOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import { Button, Popover, Row, Select, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import {
    MessageChatItemFromYou,
    MessageChatItemToYou,
} from './message-chat-item'
// Socket
import { truncateString } from '@/utils/format-string'
import { useTranslations } from 'next-intl'
import React from 'react'
import { io } from 'socket.io-client'
import { ChatPermissionEnum, ScrollType } from '@/constants/meeting'
import { RoleMtgEnum } from '@/constants/role-mtg'
import { set } from 'date-fns'

interface IPermissionChat {
    id: number
    name: string
    description?: string
}

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
    chatPermissionId: number
}

interface IMeetingChat {
    meetingInfo: IMeetingInfo
}

const MeetingChat = ({ meetingInfo }: IMeetingChat) => {
    const t = useTranslations()
    const bottomOfMessageChat = useRef<null | HTMLElement>(null)
    const messageRefs = useRef<(HTMLElement | null)[]>([])

    const { authState } = useAuthLogin()

    const [scrollToMessageId, setScrollToMessageId] = useState<
        number | undefined
    >(undefined)
    const [scrollToBottom, setScrollToBottom] = useState<{
        type: ScrollType
        scroll: boolean
    }>({
        type: ScrollType.SMOOTH,
        scroll: false,
    })
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

    //Permission Chat
    const [idHost, setIdHost] = useState<number[]>([])
    const [listPermissionChat, setListPermissionChat] = useState<
        IPermissionChat[]
    >([])
    const [permissionChat, setPermissionChat] = useState<number>(
        meetingInfo.chatPermissionId,
    )

    const [initMessage, setInitMessage] = useState<DataMessageChat>()

    const [lasteIndexReadedMessage, setLasteIndexReadedMessage] = useState<number>(dataChat.messageChat.length );
    const [countUnreadMessage, setCountUnreadMessage] = useState<number>(0);

    //Socket
    const [socket, setSocket] = useState<any>(undefined)
    useEffect(() => {
        const socket = io(String(process.env.NEXT_PUBLIC_API_SOCKET))

        socket.on(`receive_chat_public/${dataChat.roomChat}`, (message) => {
            setDataChat((prev) => {
                const newMessage = {...message, isReaded: false}
                return {
                    roomChat: prev.roomChat,
                    messageChat: [...prev.messageChat, newMessage],
                }
            })
            if(message.senderId !== authState.userData?.id){
                setCountUnreadMessage((prevCount) => prevCount + 1);
            }
        })
        
        socket.on(
            `receive_chat_private/${dataChat.roomChat}/${authState.userData?.id}`,
            (message) => {
                setDataChat((prev) => {
                    setCountUnreadMessage((prevCount) => prevCount + 1);
                    const newMessage = {...message, isReaded: false}
                    return {
                        roomChat: prev.roomChat,
                        messageChat: [
                            ...prev.messageChat,
                            {
                                ...newMessage,
                                receiverId: newMessage.receiverId
                                    ? newMessage.receiverId
                                    : 0,
                            },
                        ],
                    }
                })
                if (message.senderId !== authState.userData?.id) {
                    setCountUnreadMessage((prevCount) => prevCount + 1);
                }
            },
        )

        socket.on(
            `receive_reaction_message_public/${dataChat.roomChat}`,
            (item) => {
                console.log('receive_reaction_message-public', item)
                setDataChat((prev) => {
                    const updatedMessageChat = prev.messageChat.map((msg) => {
                        if (msg.id === item.messageId) {
                            let updatedReactions: ReactionMessage[] =
                                msg.reactions ? [...msg.reactions] : []
                            const reactionIndex = updatedReactions.findIndex(
                                (reaction) => reaction.id === item.id,
                            )

                            if (reactionIndex >= 0 && item.userId !== null) {
                                updatedReactions[reactionIndex] = item
                            } else if (
                                reactionIndex < 0 &&
                                item.userId !== null
                            ) {
                                updatedReactions.push(item)
                            } else if (
                                reactionIndex >= 0 &&
                                item.userId === null
                            ) {
                                updatedReactions = updatedReactions.filter(
                                    (reaction) => reaction.id !== item.id,
                                )
                            }

                            return {
                                ...msg,
                                reactions: updatedReactions,
                            }
                        }

                        return msg
                    })

                    return {
                        roomChat: prev.roomChat,
                        messageChat: updatedMessageChat,
                    }
                })
            },
        )

        socket.on(
            `receive_reaction_message_private/${dataChat.roomChat}/${authState.userData?.id}`,
            (item) => {
                console.log('receive_reaction_message-private', item)
                setDataChat((prev) => {
                    const updatedMessageChat = prev.messageChat.map((msg) => {
                        if (msg.id === item.messageId) {
                            let updatedReactions: ReactionMessage[] =
                                msg.reactions ? [...msg.reactions] : []
                            const reactionIndex = updatedReactions.findIndex(
                                (reaction) => reaction.id === item.id,
                            )

                            if (reactionIndex >= 0 && item.userId !== null) {
                                updatedReactions[reactionIndex] = item
                            } else if (
                                reactionIndex < 0 &&
                                item.userId !== null
                            ) {
                                updatedReactions.push(item)
                            } else if (
                                reactionIndex >= 0 &&
                                item.userId === null
                            ) {
                                updatedReactions = updatedReactions.filter(
                                    (reaction) => reaction.id !== item.id,
                                )
                            }
                            return {
                                ...msg,
                                reactions: updatedReactions,
                            }
                        }

                        return msg
                    })

                    return {
                        roomChat: prev.roomChat,
                        messageChat: updatedMessageChat,
                    }
                })
            },
        )

        //Socket update permission of chat
        socket.on(
            `permission_chat_meeting/${dataChat.roomChat}`,
            (permission) => {
                setPermissionChat(permission)
            },
        )

        setSocket(socket)
    }, [dataChat.roomChat])

    useEffect(() => {
        const fetchDataChat = async (meetingId: number) => {
            setInitStatus(FETCH_STATUS.LOADING)
            try {
                const res =
                    await serviceChatMeeting.getAllMessageChatByMeetingId(
                        meetingId,
                    )
                const listPermissionChat =
                    await serviceChatMeeting.getAllPermissionChat({
                        page: 1,
                        limit: 10,
                    })
                if (res) {
                    setDataChat(res)
                    setInitStatus(FETCH_STATUS.SUCCESS)
                }
                if (listPermissionChat) {
                    setListPermissionChat(listPermissionChat)
                }
            } catch (error) {}
        }

        if (meetingInfo.id) {
            fetchDataChat(meetingInfo.id)
        }
    }, [meetingInfo.id])

    //Scroll to bottom chat
    useEffect(() => {
        if (scrollToBottom.scroll) {
            if (scrollToBottom.type == ScrollType.SMOOTH) {
                // console.log('scroll to bottom chat smooth')
                setTimeout(() => {
                    bottomOfMessageChat.current?.scrollIntoView({
                        behavior: 'smooth',
                        // block: 'end',
                        // inline: 'nearest',
                    })
                }, 0)
            } else {
                // console.log('scroll to bottom chat fast')
                setTimeout(() => {
                    bottomOfMessageChat.current?.scrollIntoView({})
                }, 100)
            }

            setScrollToBottom({
                type: ScrollType.FAST,
                scroll: false,
            })
        }
    }, [scrollToBottom])

    const participantToSendMessage = useMemo(() => {
        const participant = meetingInfo.participants
            .map((participant) => participant.userParticipants)
            .flatMap((user) => user)

        const cachedObject: {
            [key in string]: boolean
        } = {}
        const uniqueParticipant = participant
            .filter((obj) => {
                if (
                    !cachedObject[obj.userId] &&
                    obj.userId !== authState.userData?.id
                ) {
                    cachedObject[obj.userId] = true
                    return true
                }
                return false
            })
            .map((user) => {
                return {
                    userId: user.userId,
                    userEmail: user.userEmail,
                }
            })

        //Get Id of Host in Meeting
        const hostParticipantId =
            meetingInfo.participants
                .find(
                    (participant) =>
                        participant.roleMtgName.toUpperCase() ===
                        RoleMtgEnum.HOST.toUpperCase(),
                )
                ?.userParticipants.map((user) => user.userId) ?? []

        setIdHost(hostParticipantId)

        return [
            {
                userId: 0,
                userEmail: 'EveryOne',
            },
            ...uniqueParticipant,
        ]
    }, [...meetingInfo.participants])

    const objParticipant = useMemo((): { [key in number]: string } => {
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
            setCountUnreadMessage(0);
            setScrollToBottom({
                type: ScrollType.SMOOTH,
                scroll: true,
            })
        }
        setChatModalOpen(!chatModalOpen)
    }

    const onChange = (value: string) => {
        setSendToUser(+value)
    }

    const choiceSendMessageTo = (e: string) => {
        const idOfUserToSendMessage = participantToSendMessage.find(
            (user) => user.userEmail.toLowerCase() == e.toLowerCase(),
        )
        if (idOfUserToSendMessage) {
            setSendToUser(+idOfUserToSendMessage.userId)
        }
    }

    const replyResponseMessage = (e: number) => {
        const message = dataChat.messageChat.find((message) => message.id == e)
        if (message) {
            setInitMessage(message)
            if (message.receiver.id === authState?.userData?.id) {
                setSendToUser(+message.sender.id)
            } else if (
                message.sender.id === authState?.userData?.id &&
                message.receiver.id !== 0
            ) {
                setSendToUser(+message.receiver.id)
            } else if (message.receiver.id === 0) {
                setSendToUser(message.receiver.id)
            }
        }
    }

    const reactionMessage = (
        reactionIconId: number,
        messageId: number,
        to: string,
        from?: string,
    ) => {
        if (authState.userData?.id) {
            if (to === 'EveryOne') {
                socket.emit('send_reaction_message_public', {
                    userId: authState.userData?.id,
                    messageId: messageId,
                    meetingId: meetingInfo.id,
                    reactionIconId: reactionIconId,
                    to: 0,
                    from: authState.userData.id,
                })
            } else if (to === 'You') {
                const toId = participantToSendMessage.find(
                    (e) => e.userEmail == from,
                )?.userId

                socket.emit('send_reaction_message_private', {
                    userId: authState.userData?.id,
                    messageId: messageId,
                    meetingId: meetingInfo.id,
                    reactionIconId: reactionIconId,
                    to: toId,
                    from: authState.userData.id,
                })
            }

            if (authState?.userData?.email === from && to !== 'EveryOne') {
                const toId = participantToSendMessage.find(
                    (e) => e.userEmail == to,
                )?.userId

                socket.emit('send_reaction_message_private', {
                    userId: authState.userData?.id,
                    messageId: messageId,
                    meetingId: meetingInfo.id,
                    reactionIconId: reactionIconId,
                    to: toId,
                    from: authState.userData.id,
                })
            }
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

        if (idSender) {
            // console.log(
            //     `Send Message to ${sendToUser} message : ${valueMessage}`,
            // )
            // const now = new Date()
            // const year = now.getFullYear()
            // const month = (now.getMonth() + 1).toString().padStart(2, '0')
            // const day = now.getDate().toString().padStart(2, '0')
            // const hours = now.getHours().toString().padStart(2, '0')
            // const minutes = now.getMinutes().toString().padStart(2, '0')
            // const seconds = now.getSeconds().toString().padStart(2, '0')
            // const milliseconds = now
            //     .getMilliseconds()
            //     .toString()
            //     .padStart(3, '0')

            // const isoStringWithZ = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`

            // Send Chat Private
            if (receiverId) {
                if (initMessage) {
                    socket.emit('send_chat_private', {
                        meetingId: meetingInfo.id,
                        receiver: {
                            id: receiverId,
                            email: objParticipant[sendToUser],
                        },
                        sender: {
                            id: idSender,
                            email: objParticipant[idSender],
                        },
                        content: valueMessage,
                        replyMessage: {
                            id: initMessage.id,
                            senderId: {
                                id: initMessage.sender.id,
                                email: initMessage.sender.email,
                            },
                            receiverId: {
                                id: initMessage.receiver.id,
                                email: initMessage.receiver.email,
                            },
                            content: initMessage.content,
                        },
                    })
                } else {
                    socket.emit('send_chat_private', {
                        meetingId: meetingInfo.id,
                        receiver: {
                            id: receiverId,
                            email: objParticipant[sendToUser],
                        },
                        sender: {
                            id: idSender,
                            email: objParticipant[idSender],
                        },
                        content: valueMessage,
                    })
                }
            } else {
                //Send chat Publish
                if (initMessage) {
                    socket.emit('send_chat_public', {
                        meetingId: meetingInfo.id,
                        receiver: {
                            id: receiverId,
                            email: objParticipant[sendToUser],
                        },
                        sender: {
                            id: idSender,
                            email: objParticipant[idSender],
                        },
                        content: valueMessage,
                        replyMessage: {
                            id: initMessage.id,
                            senderId: {
                                id: initMessage.sender.id,
                                email: initMessage.sender.email,
                            },
                            receiverId: {
                                id: initMessage.receiver.id,
                                email: initMessage.receiver.email,
                            },
                            content: initMessage.content,
                        },
                    })
                    
                } else {
                    socket.emit('send_chat_public', {
                        meetingId: meetingInfo.id,
                        receiver: {
                            id: receiverId,
                            email: objParticipant[sendToUser],
                        },
                        sender: {
                            id: idSender,
                            email: objParticipant[idSender],
                        },
                        content: valueMessage,
                    })
                    
                }
            }
            
            setScrollToBottom({
                type: ScrollType.FAST,
                scroll: true,
            })
        } else {
            console.log('Send message chat failed!!! UnAuthor')
        }
        setValueMessage('')
        setInitMessage(undefined)
    }

    const clearReplySelection = () => {
        setInitMessage(undefined)
    }

    //Scroll to message is reply
    const scrollToMessageReply = (id: number) => {
        if (messageRefs.current.length) {
            // @ts-ignore
            messageRefs.current[id].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
            setScrollToMessageId(id)

            setTimeout(() => setScrollToMessageId(undefined), 2000)
        }
    }

    //Handle setting permission chat in MTG
    const settingPermissionChat = async (id: number) => {
        if (
            id !== permissionChat &&
            authState.userData?.id &&
            idHost.includes(authState.userData?.id)
        ) {
            socket.emit('permission_chat_meeting', {
                userId: authState.userData?.id,
                meetingId: meetingInfo.id,
                companyId: authState.userData.companyId,
                permissionChatId: id,
            })
        } else {
            console.log('Cannot change permission chat of meeting!!!!')
        }
    }


    const controlAlowChat: { allowSendMess: boolean; onlyPublic: boolean } =
        useMemo(() => {
            const permissionChatName = listPermissionChat.find(
                (permission) => permission.id === permissionChat,
            )?.name
            switch (permissionChatName) {
                case ChatPermissionEnum.EVERY_PUBLIC:
                    return {
                        allowSendMess: true,
                        onlyPublic: true,
                    }
                    break
                case ChatPermissionEnum.HOST_ONLY:
                    return {
                        allowSendMess: authState.userData?.id
                            ? idHost.includes(authState.userData?.id)
                            : false,
                        onlyPublic: false,
                    }
                    break
                case ChatPermissionEnum.EVERY_PUBLIC_PRIVATE:
                    return {
                        allowSendMess: true,
                        onlyPublic: false,
                    }
                    break
                default:
                    return {
                        allowSendMess: false,
                        onlyPublic: false,
                    }
            }
        }, [permissionChat, listPermissionChat])

    return (
        <>
            <div className="fixed bottom-7 right-5 h-auto">
                <div
                    className={`mb-14 mr-3 border bg-white ${
                        chatModalOpen
                            ? 'animate-message-chat-move-left'
                            : 'hidden animate-message-chat-move-right'
                    }`}
                >
                    <div
                        className={`flex w-[400px] flex-col ${
                            initMessage ? 'h-[680px]' : 'h-[600px]'
                        }`}
                    >
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
                                <div className="relative mb-2 flex h-[7%] w-full items-center bg-[#5151e5] px-2">
                                    <span className="text-xl font-medium text-[#ffffff]">
                                        Chat {meetingInfo.title}
                                    </span>
                                    <MinusOutlined
                                        className="absolute right-2 top-[7px]"
                                        onClick={toggleModelDetailResolution}
                                        style={{
                                            fontSize: '22px',
                                            color: '#ffffff',
                                        }}
                                    />
                                </div>
                                <div
                                    className={`${
                                        initMessage ? 'h-[70%]' : 'h-[76%]'
                                    }`}
                                >
                                    {/* <div className="border-black-500 relative mx-auto h-full w-[95%] overflow-hidden border px-2 hover:overflow-y-auto"> */}
                                    <div className="border-black-500 relative mx-auto h-full w-[95%] overflow-y-auto border px-2">
                                        <div className="fixed right-[50%] top-[8%] z-10 flex w-[95%] translate-x-2/4 border border-gray-400 bg-[#A8C3EB] px-[12px]">
                                            <p className="mx-auto">
                                                {t(
                                                    listPermissionChat.find(
                                                        (permission) =>
                                                            permission.id ===
                                                            permissionChat,
                                                    )?.name,
                                                )}
                                            </p>
                                        </div>
                                        <div className="h-[20px]"></div>
                                        {dataChat?.messageChat?.map(
                                            (message, index) => {
                                                //Get Date of Message
                                                const dateMessage = new Date(
                                                    message.createdAt,
                                                )
                                                const dateInfo = {
                                                    year: dateMessage.getUTCFullYear(),
                                                    month:
                                                        dateMessage.getUTCMonth() +
                                                        1,
                                                    day: dateMessage.getUTCDate(),
                                                    hour: dateMessage.getUTCHours(),
                                                    minute: dateMessage.getUTCMinutes(),
                                                }
                                                //Get Date of Message Prev
                                                let dateInfoPrev: {
                                                    year: number
                                                    month: number
                                                    day: number
                                                }
                                                if (index == 0) {
                                                    dateInfoPrev = {
                                                        year: 0,
                                                        month: 0,
                                                        day: 0,
                                                    }
                                                } else {
                                                    const dateMessagePrev =
                                                        new Date(
                                                            dataChat.messageChat[
                                                                index - 1
                                                            ].createdAt,
                                                        )
                                                    dateInfoPrev = {
                                                        year: dateMessagePrev.getUTCFullYear(),
                                                        month:
                                                            dateMessagePrev.getUTCMonth() +
                                                            1,
                                                        day: dateMessagePrev.getUTCDate(),
                                                    }
                                                }

                                                if (
                                                    message.sender?.id ==
                                                    authState.userData?.id
                                                ) {
                                                    return (
                                                        <span
                                                            ref={(ref) =>
                                                                (messageRefs.current[
                                                                    message.id
                                                                ] = ref)
                                                            }
                                                            key={message.id}
                                                        >
                                                            <MessageChatItemFromYou
                                                                id={message.id}
                                                                from={
                                                                    message
                                                                        .sender
                                                                        .email
                                                                }
                                                                to={
                                                                    message
                                                                        .receiver
                                                                        .email
                                                                }
                                                                date={dateInfo}
                                                                message={
                                                                    message.content
                                                                }
                                                                reactions={
                                                                    message.reactions
                                                                        ? message.reactions
                                                                        : undefined
                                                                }
                                                                messageInfoPrev={{
                                                                    from: dataChat
                                                                        .messageChat[
                                                                        index -
                                                                            1
                                                                    ]?.sender
                                                                        .email,
                                                                    to: dataChat
                                                                        .messageChat[
                                                                        index -
                                                                            1
                                                                    ]?.receiver
                                                                        .email,
                                                                    datePrev: {
                                                                        ...dateInfoPrev,
                                                                    },
                                                                }}
                                                                replyMessage={
                                                                    message.replyMessage
                                                                        ? {
                                                                              id: message
                                                                                  ?.replyMessage
                                                                                  ?.id,
                                                                              from: message
                                                                                  ?.replyMessage
                                                                                  ?.senderId
                                                                                  .email,
                                                                              to: message
                                                                                  ?.replyMessage
                                                                                  ?.receiverId
                                                                                  .email,
                                                                              content:
                                                                                  message
                                                                                      ?.replyMessage
                                                                                      ?.content,
                                                                          }
                                                                        : undefined
                                                                }
                                                                setSentUserTo={
                                                                    choiceSendMessageTo
                                                                }
                                                                setReplyMessage={
                                                                    replyResponseMessage
                                                                }
                                                                scrollToMessageReply={
                                                                    scrollToMessageReply
                                                                }
                                                                scrollTo={
                                                                    scrollToMessageId ==
                                                                    message.id
                                                                }
                                                                setReactionMessageId={
                                                                    reactionMessage
                                                                }
                                                                participantToSendMessage={
                                                                    participantToSendMessage
                                                                }
                                                            />
                                                        </span>
                                                    )
                                                }

                                                return (
                                                    <span
                                                        ref={(ref) =>
                                                            (messageRefs.current[
                                                                message.id
                                                            ] = ref)
                                                        }
                                                        key={message.id}
                                                    >
                                                        <MessageChatItemToYou
                                                            id={message.id}
                                                            from={
                                                                message.sender
                                                                    .email
                                                            }
                                                            to={
                                                                message.receiver.email.toLowerCase() ==
                                                                authState.userData?.email.toLowerCase()
                                                                    ? 'You'
                                                                    : message
                                                                          .receiver
                                                                          .email
                                                            }
                                                            date={dateInfo}
                                                            message={
                                                                message.content
                                                            }
                                                            messageInfoPrev={{
                                                                from: dataChat
                                                                    .messageChat[
                                                                    index - 1
                                                                ]?.sender.email,
                                                                to:
                                                                    dataChat
                                                                        .messageChat[
                                                                        index -
                                                                            1
                                                                    ]?.receiver
                                                                        .email ==
                                                                    authState
                                                                        .userData
                                                                        ?.email
                                                                        ? 'You'
                                                                        : dataChat
                                                                              .messageChat[
                                                                              index -
                                                                                  1
                                                                          ]
                                                                              ?.receiver
                                                                              .email,
                                                                datePrev: {
                                                                    ...dateInfoPrev,
                                                                },
                                                            }}
                                                            replyMessage={
                                                                message.replyMessage
                                                                    ? {
                                                                          id: message
                                                                              ?.replyMessage
                                                                              ?.id,
                                                                          from: message
                                                                              ?.replyMessage
                                                                              ?.senderId
                                                                              .email,
                                                                          to: message
                                                                              ?.replyMessage
                                                                              ?.receiverId
                                                                              .email,
                                                                          content:
                                                                              message
                                                                                  ?.replyMessage
                                                                                  ?.content,
                                                                      }
                                                                    : undefined
                                                            }
                                                            reactions={
                                                                message.reactions
                                                                    ? message.reactions
                                                                    : undefined
                                                            }
                                                            setSentUserTo={
                                                                choiceSendMessageTo
                                                            }
                                                            scrollToMessageReply={
                                                                scrollToMessageReply
                                                            }
                                                            scrollTo={
                                                                scrollToMessageId ==
                                                                message.id
                                                            }
                                                            setReplyMessage={
                                                                replyResponseMessage
                                                            }
                                                            setReactionMessageId={
                                                                reactionMessage
                                                            }
                                                            participantToSendMessage={
                                                                participantToSendMessage
                                                            }
                                                        />
                                                    </span>
                                                )
                                            },
                                        )}
                                        <span ref={bottomOfMessageChat}></span>
                                    </div>
                                </div>
                                <div
                                    className={`mx-1 my-1 flex gap-5 px-2 ${
                                        initMessage ? 'h-[23%]' : 'h-[16%]'
                                    }`}
                                >
                                    <div className="flex w-[95%] flex-col gap-2">
                                        <div className="flex w-full items-center">
                                            <div className="w-[95%]">
                                                <span>{t('TO')}: </span>
                                                <Select
                                                    defaultValue={'0'}
                                                    value={
                                                        controlAlowChat.onlyPublic
                                                            ? '0'
                                                            : String(sendToUser)
                                                    }
                                                    showSearch
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    // onSearch={onSearch}
                                                    filterOption={filterOption}
                                                    options={
                                                        controlAlowChat.onlyPublic
                                                            ? [
                                                                  {
                                                                      value: '0',
                                                                      label: 'EveryOne',
                                                                  },
                                                              ]
                                                            : participantToSendMessage.map(
                                                                  (user) => ({
                                                                      value:
                                                                          user.userId +
                                                                          '',
                                                                      label: user.userEmail,
                                                                  }),
                                                              )
                                                    }
                                                    size={'small'}
                                                    className="ml-2 w-[60%] rounded-[7px]"
                                                />
                                            </div>
                                            {authState.userData?.id &&
                                                idHost.includes(
                                                    authState.userData?.id,
                                                ) && (
                                                    <Popover
                                                        placement="topRight"
                                                        title={
                                                            <div className="text-center">
                                                                {t(
                                                                    'SETTING_CHAT',
                                                                )}
                                                            </div>
                                                        }
                                                        content={
                                                            <div className="flex flex-col">
                                                                {listPermissionChat.map(
                                                                    (
                                                                        permission,
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                className={`cursor-pointer items-stretch ${
                                                                                    permissionChat ==
                                                                                    permission.id
                                                                                        ? 'bg-blue-300'
                                                                                        : ''
                                                                                }`}
                                                                                key={
                                                                                    permission.id
                                                                                }
                                                                                onClick={() => {
                                                                                    settingPermissionChat(
                                                                                        permission.id,
                                                                                    )
                                                                                }}
                                                                            >
                                                                                <div className="flex justify-between">
                                                                                    <span>
                                                                                        {t(
                                                                                            permission.name,
                                                                                        )}
                                                                                    </span>
                                                                                    {/* {permissionChat ==
                                                                                        permission.id && (
                                                                                        <CheckOutlined className="mr-1" />
                                                                                    )} */}
                                                                                    <CheckOutlined
                                                                                        className={`ml-3 mr-1 ${
                                                                                            permissionChat !==
                                                                                            permission.id
                                                                                                ? 'invisible'
                                                                                                : ''
                                                                                        }`}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    },
                                                                )}
                                                            </div>
                                                        }
                                                        trigger="click"
                                                    >
                                                        <MoreOutlined
                                                            style={{
                                                                fontSize:
                                                                    '22px',
                                                            }}
                                                        />
                                                    </Popover>
                                                )}
                                        </div>

                                        {initMessage && (
                                            <div className="relative flex justify-between rounded-lg bg-gray-200 p-1 ">
                                                <div>
                                                    <div>
                                                        <span className="text-xs">
                                                            {t('RESPONSE')}{' '}
                                                        </span>
                                                        <span className="text-sm font-semibold">
                                                            {initMessage?.sender
                                                                ?.id ===
                                                            authState?.userData
                                                                ?.id
                                                                ? ''
                                                                : initMessage
                                                                      ?.sender
                                                                      .email}
                                                        </span>
                                                    </div>
                                                    <span>
                                                        {truncateString({
                                                            text: initMessage?.content,
                                                            start: 44,
                                                            end: 0,
                                                        })}{' '}
                                                    </span>
                                                </div>
                                                <Button
                                                    className="absolute right-0 top-0 flex items-center justify-center rounded-sm border-none bg-gray-200 text-xs font-medium"
                                                    onClick={
                                                        clearReplySelection
                                                    }
                                                >
                                                    X
                                                </Button>
                                            </div>
                                        )}

                                        <div className="flex w-full items-center gap-5">
                                            <TextArea
                                                value={
                                                    controlAlowChat.allowSendMess
                                                        ? valueMessage
                                                        : ''
                                                }
                                                onChange={(e) =>
                                                    pressMessageChat(e)
                                                }
                                                placeholder={t(
                                                    'PLEASE_INPUT_MESSAGE',
                                                )}
                                                autoSize={{
                                                    minRows: 2,
                                                    maxRows: 2,
                                                }}
                                                onKeyUp={(e) => {
                                                    if (
                                                        e.keyCode == 13 &&
                                                        !e.shiftKey &&
                                                        valueMessage.trim()
                                                    ) {
                                                        sendMessage()
                                                    }
                                                    if (
                                                        e.keyCode == 13 &&
                                                        e.shiftKey
                                                    ) {
                                                    }
                                                }}
                                                disabled={
                                                    !controlAlowChat.allowSendMess
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                shape="round"
                                                icon={
                                                    <SendOutlined
                                                        style={{
                                                            fontSize: '15px',
                                                        }}
                                                    />
                                                }
                                                size="middle"
                                                onClick={() => {
                                                    if (valueMessage.trim()) {
                                                        sendMessage()
                                                    }
                                                }}
                                                disabled={
                                                    !valueMessage.trim() ||
                                                    !controlAlowChat.allowSendMess
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 right-0">

                    {chatModalOpen===false && countUnreadMessage > 0 && (
                        <div className='absolute top-[-10px] right-0 bg-red-500 mt-1 text-white rounded-full w-6 h-6 flex justify-center items-center text-center'>
                            {countUnreadMessage > 5? '5+': countUnreadMessage}
                        </div>
                    )}
                    <MessageTwoTone
                        twoToneColor="#5151e5"
                        style={{ fontSize: '48px' }}
                        onClick={toggleModelDetailResolution}
                    />

                </div>
            </div>
        </>
    )
}

export default MeetingChat
