import {
    IGetAllDataReponse,
    IMeetingDetailResponse,
    IUploadResponse,
} from './response.type'
import { get, post } from './fetcher'
import { IGetAllMeetingQuery, IMeeting } from '@/stores/meeting/types'
import { ICreateMeetingPayload } from './request.type'

const serviceMeeting = {
    getAllMeetings: async ({
        page,
        limit,
        type,
        filter,
    }: IGetAllMeetingQuery): Promise<IGetAllDataReponse<IMeeting>> => {
        const payload = { page, limit, type, ...filter }
        const response: { data: IGetAllDataReponse<IMeeting> } = await get(
            '/meetings',
            payload,
        )

        return response.data
    },
    createMeeting: async (payload: ICreateMeetingPayload) => {
        const response = await post<IUploadResponse>('/meetings', payload)
        return response.data
    },
    getDetailMeeting: async (meetingId: number) => {
        const response = await get<IMeetingDetailResponse>(
            `/meetings/${meetingId}`,
        )
        return response.data
    },
}

export default serviceMeeting
