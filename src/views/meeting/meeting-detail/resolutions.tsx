import BoxArea from '@/components/box-area'
import DetailResolutionItem from '@/components/detail-resolution-item'
import { Resolution } from '@/constants/resolution'
import { useTranslations } from 'next-intl'

interface IData extends Resolution {
    percentVoted: number
}

const data: IData[] = [
    {
        title: 'Approve the final budget',
        content: '',
        percentVoted: 10,
    },
    {
        title: 'Change of senior personnel in the first quarter',
        content: '',
        percentVoted: 11.5,
    },
    {
        title: 'Boosting post-covid production',
        content: '',
        percentVoted: 0,
    },
    {
        title: 'Approve the bonus budget first quarter',
        content: '',
        percentVoted: 15,
    },
]

const Resolutions = () => {
    const t = useTranslations()

    return (
        <BoxArea title={t('RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.map((x, index) => (
                    <DetailResolutionItem
                        key={index}
                        index={index + 1}
                        title={x.title}
                        content={x.content}
                        percentVoted={x.percentVoted}
                    />
                ))}
            </div>
        </BoxArea>
    )
}

export default Resolutions
