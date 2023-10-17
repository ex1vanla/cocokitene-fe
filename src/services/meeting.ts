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
        searchQuery,
        sortOrder,
    }: IGetAllMeetingQuery) => {
        const response = await get<IGetAllDataReponse<IMeeting>>('/meetings', {
            type,
            page,
            limit,
            searchQuery,
            sortOrder,
        })

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
