import { Resolution, VoteProposalResult } from '@/constants/resolution'
import { formatNumber } from '@/utils/format-number'
import { Radio, RadioChangeEvent, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const { Text } = Typography

interface IDetailResolutionItem extends Resolution {
    index: number
    percentVoted: number
    voteResult: VoteProposalResult
}

const DetailResolutionItem = ({
    index,
    title,
    content,
    percentVoted,
    voteResult,
}: IDetailResolutionItem) => {
    const [value, setValue] = useState(voteResult)

    const t = useTranslations()

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value)
        setValue(e.target.value)
    }
    return (
        <div className="flex items-center justify-between border-b border-b-neutral/4 py-3">
            <div className="flex items-center justify-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral/5 bg-neutral/2">
                    <Text className="text-bold">{index}</Text>
                </div>
                <Text
                    title={content}
                    className="cursor-pointer text-primary underline decoration-1"
                >
                    {title}
                </Text>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <Text className="text-polar-green">
                        {formatNumber(percentVoted, {
                            maximumFractionDigits: 1,
                        })}
                        %
                    </Text>
                    <Text className="text-black-45">{t('VOTED')}</Text>
                </div>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={VoteProposalResult.VOTE}>{t('VOTED')}</Radio>
                    <Radio value={VoteProposalResult.UN_VOTE}>
                        {t('UNVOTED')}
                    </Radio>
                    <Radio value={VoteProposalResult.NO_IDEA}>
                        {t('NO_IDEA')}
                    </Radio>
                </Radio.Group>
            </div>
        </div>
    )
}

export default DetailResolutionItem
