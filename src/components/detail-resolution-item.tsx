import { Resolution, VoteProposalResult } from '@/constants/resolution'
import { IProposalCreator } from '@/stores/meeting/types'
import { formatNumber } from '@/utils/format-number'
import { truncateString } from '@/utils/format-string'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { Avatar, Modal, Radio, RadioChangeEvent, Typography } from 'antd'
import Color from 'color'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const { Text } = Typography

interface IDetailResolutionItem extends Resolution {
    index: number
    percentVoted: number
    percentUnVoted: number
    percentNotVoteYet: number
    voteResult: VoteProposalResult
    creator: IProposalCreator
}

const DetailResolutionItem = ({
    index,
    title,
    content,
    percentVoted,
    percentUnVoted,
    percentNotVoteYet,
    voteResult,
    creator,
}: IDetailResolutionItem) => {
    const [value, setValue] = useState(voteResult)
    const [modalOpen, setOpenModal] = useState<boolean>(false)

    const t = useTranslations()

    const toggleModelDetailResolution = () => {
        setOpenModal(!modalOpen)
    }

    const { avatar, defaultAvatarHashColor, username, email } = creator
    const backgroundAvatarColor = Color(defaultAvatarHashColor as string)
        .lighten(0.6)
        .hex()

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value)
        setValue(e.target.value)
    }
    return (
        <div className="flex items-center justify-between border-b border-b-neutral/4 py-3">
            <Modal
                title={title}
                open={modalOpen}
                onCancel={toggleModelDetailResolution}
                footer={null}
            >
                <div className="text-black-45">{t('CONTENT')}</div>
                <div>{content}</div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="text-black-45">{t('CREATED_BY')}:</div>
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
                                color: defaultAvatarHashColor as string,
                            }}
                            size="small"
                        >
                            {getFirstCharacterUpperCase(username)}
                        </Avatar>
                    )}
                    <div className="cursor-pointer">
                        <Text title={email}>
                            {truncateString({
                                text: username,
                                start: 10,
                                end: 0,
                            })}{' '}
                        </Text>
                    </div>
                </div>
            </Modal>
            <div className="flex items-center justify-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral/5 bg-neutral/2">
                    <Text className="text-bold">{index}</Text>
                </div>
                <Text
                    title={content}
                    className="cursor-pointer text-primary underline decoration-1"
                    onClick={toggleModelDetailResolution}
                >
                    {title}
                </Text>
            </div>
            <div className="flex items-center gap-8">
                {/* <div className="flex items-center gap-2">
                    <Text className="text-polar-green">
                        {formatNumber(percentVoted, {
                            maximumFractionDigits: 1,
                        })}
                        %
                    </Text>
                    <Text className="text-black-45">{t('VOTED')}</Text>
                </div> */}
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={VoteProposalResult.VOTE}>
                        <div className="flex flex-col">
                            <div>{t('VOTED')}</div>
                            <Text className="text-polar-green">
                                {formatNumber(percentVoted, {
                                    maximumFractionDigits: 1,
                                })}
                                %
                            </Text>
                        </div>
                    </Radio>
                    <Radio value={VoteProposalResult.UN_VOTE}>
                        <div className="flex flex-col">
                            <div>{t('UNVOTED')}</div>
                            <Text className="text-polar-green">
                                {formatNumber(percentUnVoted, {
                                    maximumFractionDigits: 1,
                                })}
                                %
                            </Text>
                        </div>
                    </Radio>
                    <Radio value={VoteProposalResult.NO_IDEA}>
                        <div className="flex flex-col">
                            <div>{t('NO_IDEA')}</div>
                            <Text className="text-polar-green">
                                {formatNumber(percentNotVoteYet, {
                                    maximumFractionDigits: 1,
                                })}
                                %
                            </Text>
                        </div>
                    </Radio>
                </Radio.Group>
            </div>
        </div>
    )
}

export default DetailResolutionItem
