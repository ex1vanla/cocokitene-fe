import BoxArea from '@/components/box-area'
import DetailResolutionItem from '@/components/detail-resolution-item'
import { ResolutionType } from '@/constants/resolution'
import { useResolutions } from '@/stores/meeting/hooks'
import { Empty } from 'antd'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

const AmendmentResolutions = () => {
    const amendmentResolutions = useResolutions(
        ResolutionType.AMENDMENT_RESOLUTION,
    )

    const t = useTranslations()

    const body = useMemo(() => {
        if (amendmentResolutions.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        marginBlock: 0,
                    }}
                />
            )
        }

        return amendmentResolutions.map((amendmentResolution, index) => (
            <DetailResolutionItem
                id={amendmentResolution.id}
                key={index}
                index={index + 1}
                title={amendmentResolution.title}
                content={amendmentResolution.content}
                oldContent={amendmentResolution.oldContent}
                percentVoted={amendmentResolution.percentVoted}
                voteResult={amendmentResolution.voteResult}
                creator={amendmentResolution.creator}
                percentUnVoted={amendmentResolution.percentUnVoted}
                percentNotVoteYet={amendmentResolution.percentNotVoteYet}
            />
        ))
    }, [amendmentResolutions])

    return (
        <BoxArea title={t('AMENDMENT_RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">{body}</div>
        </BoxArea>
    )
}

export default AmendmentResolutions
