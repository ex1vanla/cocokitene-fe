/* eslint-disable */

export interface Resolution {
    title: string
    content: string
}

export enum ResolutionType {
    RESOLUTION = 'resolution',
    AMENDMENT_RESOLUTION = 'amendment_resolution',
}

export enum VoteProposalOption {
    VOTE = 'vote',
    UN_VOTE = 'un_vote',
    NO_IDEA = 'no_idea',
}
