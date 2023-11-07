/* eslint-disable */

export interface Resolution {
    title: string
    content: string
    oldContent?: string
}

export enum ResolutionType {
    RESOLUTION = '0',
    AMENDMENT_RESOLUTION = '1',
}

export const ResolutionTitle: {
    [key in ResolutionType]: string
} = {
    [ResolutionType.RESOLUTION]: 'RESOLUTION',
    [ResolutionType.AMENDMENT_RESOLUTION]: 'AMENDMENT_RESOLUTION',
}

export enum VoteProposalOption {
    VOTE = 'vote',
    UN_VOTE = 'un_vote',
    NO_IDEA = 'no_idea',
}
