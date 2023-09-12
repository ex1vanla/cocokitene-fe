import BoxArea from '@/components/box-area'
import DetailResolutionItem from '@/components/detail-resolution-item'
import { Resolution } from '@/constants/resolution'
import { useTranslations } from 'next-intl'

interface IData extends Resolution {
    percentVoted: number
}

const data: IData[] = [
    {
        title: 'Mr.Nguyen Thanh Hoang would like to resign from his job',
        content: '',
        percentVoted: 30,
    },
    {
        title: 'Extraordinary General Meeting of Shareholders next month',
        content: '',
        percentVoted: 40.5,
    },
]

const AmendmentResolutions = () => {
    const t = useTranslations()

    return (
        <BoxArea title={t('AMENDMENT_RESOLUTIONS')}>
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

export default AmendmentResolutions
