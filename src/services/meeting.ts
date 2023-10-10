// import { Cookies } from 'react-cookie'
import { post } from './fetcher'
import { IUploadResponse } from './response.type'
import { ICreateMeetingPayload } from './request.type'
// const cookies = new Cookies()

const serviceMeeting = {
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
