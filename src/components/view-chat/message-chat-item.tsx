import { truncateString } from '@/utils/format-string'
import { CommentOutlined, MehOutlined } from '@ant-design/icons'
import { useState } from 'react'

export interface IMessageChatItem {
    id: number
    from: string
    to: string
    message: string
    scrollTo: boolean
    date: {
        year: number
        month: number
        day: number
        hour: number
        minute: number
    }
    messageInfoPrev: {
        from: string
        to: string
        datePrev: {
            year: number
            month: number
            day: number
        }
    }
    replyMessage?: {
        id: number
        from: string
        to: string
        content: string
    }
    // eslint-disable-next-line
    setSentUserTo: (e: string) => void
    // eslint-disable-next-line no-unused-vars
    setReplyMessage: (e: number) => void
    // eslint-disable-next-line
    scrollToMessageReply: (id: number) => void
}

export const MessageChatItemToYou = ({
    id,
    from,
    to,
    message,
    date,
    messageInfoPrev,
    setSentUserTo,
    replyMessage,
    setReplyMessage,
    scrollToMessageReply,
    scrollTo,
}: IMessageChatItem) => {
    const [isHover, setIsHover] = useState(false)

    return (
        <div
            className="flex w-full flex-col gap-[2px]"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {(messageInfoPrev.datePrev.year === date.year &&
                messageInfoPrev.datePrev.month === date.month &&
                messageInfoPrev.datePrev.day === date.day) || (
                <span className="border-blue mx-auto my-2 rounded-xl border bg-gray-400 px-2 text-white">
                    {date.day}/{date.month}/{date.year}
                </span>
            )}
            {(messageInfoPrev?.from == from &&
                messageInfoPrev?.to == to &&
                messageInfoPrev.datePrev.year === date.year &&
                messageInfoPrev.datePrev.month === date.month &&
                messageInfoPrev.datePrev.day === date.day) || (
                <div className="mt-2 flex">
                    <span className="pl-1 text-xs font-thin">
                        <span className="font-normal text-black">from </span>
                        <span
                            className="cursor-pointer text-[#0547e3]"
                            onClick={() => {
                                setSentUserTo(from)
                            }}
                        >
                            {from}
                        </span>
                        <span className="font-normal text-black"> to </span>
                        <span
                            className="cursor-pointer text-[#e305b3]"
                            onClick={() => {
                                setSentUserTo(to)
                            }}
                        >
                            {to}
                        </span>
                    </span>
                </div>
            )}
            <div
                className="mb-[1px] flex items-center"
                id={`message-${id}`}
                // onClick={() => {
                //     document.getElementById(`message-${id}`)?.scrollIntoView()
                // }}
            >
                <span
                    className={`h-auto min-w-[70px] max-w-[300px] break-words rounded-lg border border-black-45 p-1 text-[14px] ${
                        scrollTo ? 'animate-scale-up-message bg-blue-200' : ''
                    }`}
                >
                    {replyMessage !== undefined && (
                        <div
                            className="mb-1 border-l-[3px] border-black-45 bg-gray-200 p-1 font-semibold text-white"
                            onClick={() => {
                                scrollToMessageReply(replyMessage.id)
                            }}
                        >
                            <div className="text-gray-500">
                                {replyMessage.from}
                            </div>
                            <span className="text-[12px] text-gray-500">
                                {' '}
                                {truncateString({
                                    text: replyMessage?.content,
                                    start: 20,
                                    end: 0,
                                })}{' '}
                            </span>
                        </div>
                    )}

                    {message.split('\n').map((mess, index) => {
                        return <div key={index}>{mess}</div>
                    })}
                    <span className="text-[10px]">
                        {date.hour}:
                        {date.minute < 10 ? '0' + date.minute : date.minute}
                    </span>
                </span>
                {isHover && (
                    <div className="ml-1 flex h-[25px] items-center justify-between gap-1 rounded-3xl border border-gray-500 bg-white p-1">
                        <CommentOutlined
                            style={{
                                fontSize: '20px',
                                color: '#5151e5',
                            }}
                            onClick={() => {
                                setReplyMessage(id)
                            }}
                        />
                        <MehOutlined
                            style={{
                                fontSize: '20px',
                                color: '#5151e5',
                            }}
                            onClick={() => {
                                console.log('like')
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export const MessageChatItemFromYou = ({
    id,
    from,
    to,
    message,
    date,
    messageInfoPrev,
    setSentUserTo,
    replyMessage,
    setReplyMessage,
    scrollToMessageReply,
    scrollTo,
}: IMessageChatItem) => {
    const [isHover, setIsHover] = useState(false)

    return (
        <div
            className="flex w-full flex-col gap-[2px]"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {(messageInfoPrev.datePrev.year === date.year &&
                messageInfoPrev.datePrev.month === date.month &&
                messageInfoPrev.datePrev.day === date.day) || (
                <span className="border-blue mx-auto my-2 rounded-xl border bg-gray-400 px-2 text-white">
                    {date.day}/{date.month}/{date.year}
                </span>
            )}
            {(messageInfoPrev?.from == from &&
                messageInfoPrev?.to == to &&
                messageInfoPrev.datePrev.year === date.year &&
                messageInfoPrev.datePrev.month === date.month &&
                messageInfoPrev.datePrev.day === date.day) || (
                <div className="mt-2 flex justify-end">
                    <span className="pl-1 text-xs font-thin">
                        <span className="font-normal text-black">from </span>
                        <span
                            className="cursor-pointer text-[#0547e3]"
                            onClick={() => {
                                setSentUserTo(from)
                            }}
                        >
                            You
                        </span>
                        <span className="font-normal text-black"> to </span>
                        <span
                            className="cursor-pointer text-[#e305b3]"
                            onClick={() => {
                                setSentUserTo(to)
                            }}
                        >
                            {to}
                        </span>
                    </span>
                </div>
            )}
            <div className="mb-[1px] flex items-center justify-end">
                {isHover && (
                    <div className=" mr-1 flex h-[25px] items-center justify-between gap-1 rounded-3xl border border-gray-500 bg-white p-1 ">
                        <CommentOutlined
                            style={{
                                fontSize: '20px',
                                color: '#5151e5',
                            }}
                            onClick={() => {
                                setReplyMessage(id)
                            }}
                        />
                        <MehOutlined
                            style={{
                                fontSize: '20px',
                                color: '#5151e5',
                            }}
                            onClick={() => {
                                console.log('like')
                            }}
                        />
                    </div>
                )}
                <span
                    className={`h-auto min-w-[70px] max-w-[300px] break-words rounded-lg border border-black-45  p-1 pl-1 text-[14px] ${
                        scrollTo ? 'animate-scale-up-message bg-blue-200' : ''
                    }`}
                >
                    {replyMessage !== undefined && (
                        <div
                            className="mb-1 border-l-[3px] border-black-45 bg-gray-200 p-1 font-semibold text-white"
                            onClick={() => {
                                scrollToMessageReply(replyMessage.id)
                            }}
                        >
                            <div className="text-gray-500">
                                {replyMessage.from}
                            </div>
                            <span className="text-[12px] text-gray-500">
                                {' '}
                                {truncateString({
                                    text: replyMessage?.content,
                                    start: 20,
                                    end: 0,
                                })}{' '}
                            </span>
                        </div>
                    )}

                    {message.split('\n').map((mess, index) => {
                        return <div key={index}>{mess}</div>
                    })}
                    <span className="text-[10px]">
                        {date.hour}:
                        {date.minute < 10 ? '0' + date.minute : date.minute}
                    </span>
                </span>
            </div>
        </div>
    )
}
