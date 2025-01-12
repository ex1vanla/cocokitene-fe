import { FETCH_STATUS } from '@/constants/common'
import { VoteProposalOption } from '@/constants/resolution'
import { ICandidateResponse } from '@/services/response.type'
import { formatNumber } from '@/utils/format-number'
import { Modal, notification, Radio, Tooltip, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import type { RadioChangeEvent } from 'antd'
import serviceCandidate from '@/services/candidate'
import { MeetingType } from '@/constants/meeting'

const { Text } = Typography

interface IDetailPersonnelVoting {
    index: number
    title: string
    candidate: ICandidateResponse[]
    voteErrorMessage?: string
    meetingType: MeetingType
    isVoter: boolean
}

const DetailPersonnelVotingItem = ({
    index,
    title,
    candidate,
    voteErrorMessage,
    meetingType,
    isVoter,
}: IDetailPersonnelVoting) => {
    const t = useTranslations()

    const [candidateInfo, setCandidateInfo] =
        useState<ICandidateResponse[]>(candidate)

    const [voteStatus, setVoteStatus] = useState(FETCH_STATUS.IDLE)

    useEffect(() => {
        setCandidateInfo(candidate)
    }, [candidate])

    //Modal Voting Personnel
    const handleConfirmVote = (
        key: number,
        candidateId: number,
        e: RadioChangeEvent,
    ) => {
        const config = {
            title,
            content: t('DO_YOU_WANT_TO_CHANGE_YOUR_VOTE_RESULT?'),
            okText: t('OK'),
            cancelText: t('CANCEL'),
            onOk() {
                handleVotingCandidatePersonnel(key, candidateId, e)
            },
        }
        Modal.confirm(config)
    }

    // Handle Voting Candidate
    const handleVotingCandidatePersonnel = async (
        key: number,
        candidateId: number,
        e: RadioChangeEvent,
    ) => {
        try {
            setVoteStatus(FETCH_STATUS.LOADING)
            let candidate
            if (meetingType === MeetingType.SHAREHOLDER_MEETING) {
                candidate = await serviceCandidate.voteCandidateShareholderMtg(
                    candidateId,
                    e.target.value,
                )
            } else {
                candidate = await serviceCandidate.voteCandidateBoardMtg(
                    candidateId,
                    e.target.value,
                )
            }

            if (candidate) {
                const candidateInfoUpdate = [...candidateInfo]
                candidateInfoUpdate[key] = {
                    ...candidateInfoUpdate[key],
                    votedQuantity: candidate.votedQuantity,
                    unVotedQuantity: candidate.unVotedQuantity,
                    notVoteYetQuantity: candidate.notVoteYetQuantity,
                    voteResult: e.target.value,
                }

                setCandidateInfo(candidateInfoUpdate)
                setVoteStatus(FETCH_STATUS.SUCCESS)
                notification.success({
                    message: t('VOTED_CANDIDATE'),
                    description: t('CHANGE_VOTE_RESULT_CANDIDATE_SUCCESSFULLY'),
                    duration: 2,
                })
            }
        } catch (error) {
            notification.error({
                message: t('VOTED_CANDIDATE'),
                duration: 2,
            })
            setVoteStatus(FETCH_STATUS.ERROR)
        }
    }

    return (
        <>
            <div className="flex flex-col items-start justify-between gap-2 border-b border-b-neutral/4 pb-8 pl-0 pr-[-24px] pt-1 max-sm:pl-0">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-neutral/5 bg-neutral/2">
                        <Text className="text-bold">{index + 1}</Text>
                    </div>
                    <Text
                        title={title}
                        className="text-bold break-words text-base text-black decoration-1"
                    >
                        {title}
                    </Text>
                </div>
                <div className="flex w-full flex-grow items-center justify-between pl-11 max-sm:pl-6">
                    <div className="w-[50%]">{t('CANDIDATE_NAME')}</div>
                    <div className=""></div>
                </div>
                <div className="flex w-full flex-col gap-2">
                    {candidateInfo.map((candidate, key) => {
                        const votedQuantity = Number(candidate.votedQuantity)
                        const unVotedQuantity = Number(
                            candidate.unVotedQuantity,
                        )
                        const notVotedYetQuantity = Number(
                            candidate.notVoteYetQuantity,
                        )

                        const totalQuantityShare =
                            votedQuantity +
                            unVotedQuantity +
                            notVotedYetQuantity

                        return (
                            <>
                                <div
                                    className="flex w-full flex-grow items-center justify-between gap-8 pl-11 max-sm:pl-6"
                                    key={candidate.id}
                                >
                                    <div className="flex-1 break-words">
                                        {candidate.candidateName}
                                    </div>
                                    <div className="flex flex-1 items-center justify-end gap-8">
                                        {candidate?.votedQuantity !==
                                            undefined &&
                                            candidate?.unVotedQuantity !==
                                                undefined &&
                                            candidate?.notVoteYetQuantity !==
                                                undefined && (
                                                <Tooltip
                                                    placement="top"
                                                    title={t(voteErrorMessage)}
                                                >
                                                    <Radio.Group
                                                        onChange={(e) => {
                                                            handleConfirmVote(
                                                                key,
                                                                candidate.id,
                                                                e,
                                                            )
                                                        }}
                                                        value={
                                                            isVoter &&
                                                            candidate.voteResult
                                                        }
                                                        disabled={
                                                            voteStatus ===
                                                                FETCH_STATUS.LOADING ||
                                                            !!voteErrorMessage
                                                        }
                                                        className="flex justify-end max-sm:flex-col"
                                                    >
                                                        <Radio
                                                            value={
                                                                VoteProposalOption.VOTE
                                                            }
                                                            className="max-sm:w-28"
                                                        >
                                                            <div className="flex flex-col">
                                                                <div
                                                                    style={{
                                                                        whiteSpace:
                                                                            'nowrap',
                                                                    }}
                                                                >
                                                                    {t('VOTED')}
                                                                </div>
                                                                <Text className="text-polar-green">
                                                                    {formatNumber(
                                                                        totalQuantityShare ==
                                                                            0
                                                                            ? 0
                                                                            : (votedQuantity *
                                                                                  100) /
                                                                                  totalQuantityShare,
                                                                        {
                                                                            maximumFractionDigits: 2,
                                                                        },
                                                                    )}
                                                                    %
                                                                </Text>
                                                            </div>
                                                        </Radio>
                                                        <Radio
                                                            value={
                                                                VoteProposalOption.UN_VOTE
                                                            }
                                                            className="max-sm:w-28"
                                                        >
                                                            <div className="flex flex-col">
                                                                <div
                                                                    style={{
                                                                        whiteSpace:
                                                                            'nowrap',
                                                                    }}
                                                                >
                                                                    {t(
                                                                        'UNVOTED',
                                                                    )}
                                                                </div>
                                                                <Text className="text-polar-green">
                                                                    {formatNumber(
                                                                        totalQuantityShare ==
                                                                            0
                                                                            ? 0
                                                                            : (unVotedQuantity *
                                                                                  100) /
                                                                                  totalQuantityShare,
                                                                        {
                                                                            maximumFractionDigits: 2,
                                                                        },
                                                                    )}
                                                                    %
                                                                </Text>
                                                            </div>
                                                        </Radio>
                                                        <Radio
                                                            value={
                                                                VoteProposalOption.NO_IDEA
                                                            }
                                                            className="max-sm:w-28"
                                                        >
                                                            <div className="flex flex-col">
                                                                <div
                                                                    style={{
                                                                        whiteSpace:
                                                                            'nowrap',
                                                                    }}
                                                                >
                                                                    {t(
                                                                        'NO_IDEA',
                                                                    )}
                                                                </div>
                                                                <Text className="text-polar-green">
                                                                    {formatNumber(
                                                                        totalQuantityShare ==
                                                                            0
                                                                            ? 0
                                                                            : (notVotedYetQuantity *
                                                                                  100) /
                                                                                  totalQuantityShare,
                                                                        {
                                                                            maximumFractionDigits: 2,
                                                                        },
                                                                    )}
                                                                    %
                                                                </Text>
                                                            </div>
                                                        </Radio>
                                                    </Radio.Group>
                                                </Tooltip>
                                            )}
                                    </div>
                                </div>
                                {key + 1 !== candidateInfo.length && (
                                    <div className="ml-12 border-t"></div>
                                )}
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DetailPersonnelVotingItem
