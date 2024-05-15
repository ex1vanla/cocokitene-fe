export interface IMessageChatItem {
    from: string
    to: string
    message: string
    messageInfoPrev: { from: string; to: string }
    // eslint-disable-next-line
    setSentUserTo: (e: string) => void
}

export const MessageChatItemToYou = ({
    from,
    to,
    message,
    messageInfoPrev,
    setSentUserTo,
}: IMessageChatItem) => {
    return (
        <div className="flex w-full flex-col gap-[2px]">
            {(messageInfoPrev?.from == from && messageInfoPrev?.to == to) || (
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
            <div className="mb-[1px] flex">
                <span className="max-w-[80%] rounded-lg border border-black-45 p-1 text-[14px]">
                    {message}
                </span>
            </div>
        </div>
    )
}

export const MessageChatItemFromYou = ({
    from,
    to,
    message,
    messageInfoPrev,
    setSentUserTo,
}: IMessageChatItem) => {
    return (
        <div className="flex w-full flex-col gap-[2px]">
            {(messageInfoPrev?.from == from && messageInfoPrev?.to == to) || (
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
            <div className="mb-[1px] flex justify-end">
                <span className="max-w-[80%] rounded-lg border border-black-45 p-1 pl-1 text-[14px]">
                    {message}
                </span>
            </div>
        </div>
    )
}
