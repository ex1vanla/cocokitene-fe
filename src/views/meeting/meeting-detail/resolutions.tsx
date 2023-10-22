import BoxArea from '@/components/box-area'
import DetailResolutionItem from '@/components/detail-resolution-item'
import { ResolutionType } from '@/constants/resolution'
import { useResolutions } from '@/stores/meeting/hooks'
import { useTranslations } from 'next-intl'

const Resolutions = () => {
    const resolutions = useResolutions(ResolutionType.RESOLUTION)
    const t = useTranslations()

    return (
        <BoxArea title={t('RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">
                {resolutions.map((resolution, index) => (
                    <DetailResolutionItem
                        id={resolution.id}
                        key={index}
                        index={index + 1}
                        title={resolution.title}
                        content={resolution.content}
                        percentVoted={resolution.percentVoted}
                        voteResult={resolution.voteResult}
                        creator={resolution.creator}
                        percentUnVoted={resolution.percentUnVoted}
                        percentNotVoteYet={resolution.percentNotVoteYet}
                    />
                ))}
            </div>
        </BoxArea>
    )
}

export default Resolutions
