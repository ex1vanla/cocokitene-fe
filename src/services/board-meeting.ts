import {
    ICreateBoardMeetingPayload,
    IUpdateBoardMeetingPayload,
} from '@/services/request.type'
import { get, patch, post } from './fetcher'
import { IGetAllMeetingQuery, IMeeting } from '@/stores/meeting/types'
import {
    IBoardMeetingDetailResponse,
    IDataHashMeeting,
    IGetAllDataReponse,
} from '@/services/response.type'

const serviceBoardMeeting = {
    getAllMeetings: async ({
        page,
        limit,
        type,
        filter,
        meetingType,
    }: IGetAllMeetingQuery): Promise<{
        meetings: IGetAllDataReponse<IMeeting>
        allowCreate: boolean
    }> => {
        const payload = { page, limit, type, meetingType, ...filter }
        const response: {
            data: {
                meetings: IGetAllDataReponse<IMeeting>
                allowCreate: boolean
            }
        } = await get('/board-meetings', payload)
        return response.data
    },
    createBoardMeeting: async (payload: ICreateBoardMeetingPayload) => {
        const response = await post<any>('/board-meetings', payload)
        return response.data
    },

    getDetailBoardMeeting: async (boardMeetingId: number) => {
        const response = await get<IBoardMeetingDetailResponse>(
            `/board-meetings/${boardMeetingId}`,
        )
        return response.data
    },

    updateBoardMeeting: async (
        boardMeetingId: number,
        payload: IUpdateBoardMeetingPayload,
    ) => {
        const response = await patch<any>(
            `board-meetings/${boardMeetingId}`,
            payload,
        )
        return response.data
    },

    sendMailInvitationBoardMeeting: async (boardMeetingId: number) => {
        const response = await post<any>(
            `/board-meetings/send-email/board-meeting/${boardMeetingId}`,
        )
        return response.data
    },
    getDataHashBoardMeeting: async (meetingId: number) => {
        const response = await get<IDataHashMeeting>(
            `/board-meetings/${meetingId}/dataHash`,
        )
        return response.data
    },
}

export default serviceBoardMeeting
