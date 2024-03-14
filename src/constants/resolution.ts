/* eslint-disable */

import { UploadFile } from 'antd'

export interface Resolution {
    title: string
    content: string
    oldContent?: string
    fileList?: UploadFile[]
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
    VOTE = '0',
    UN_VOTE = '1',
    NO_IDEA = '2',
}
