import { IGetAllDataReponse, IUploadResponse } from './response.type'
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
    createMeeting: async (
        payload: ICreateMeetingPayload,
    ): Promise<IUploadResponse> => {
        const response: { data: IUploadResponse } = await post(
            '/meetings',
            payload,
        )
        return response.data
    },
}

export default serviceMeeting
