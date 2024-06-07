import { get, patch } from './fetcher'
import { IGetAllDataRequest } from './request.type'
import {
    IAllMeetingChatInMeetingResponse,
    IGetAllDataReponse,
    IPermissionChatResponse,
    IUpdatePermissionChat,
} from './response.type'

const serviceChatMeeting = {
    //Get All chat by meetingID
    getAllMessageChatByMeetingId: async (meetingId: number) => {
        const response = await get<IAllMeetingChatInMeetingResponse>(
            `/messages/meeting/${meetingId}`,
        )
        return response.data
    },

    //Get all permission chat
    getAllPermissionChat: async ({
        page = 1,
        limit = 10,
    }: IGetAllDataRequest): Promise<IPermissionChatResponse[]> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<IPermissionChatResponse> } =
            await get('/chat-permission', payload)
        return response.data.items
    },

    //Update Permission Chat
    updatePermissionChat: async (
        meetingId: number,
        payload: IUpdatePermissionChat,
    ) => {
        const response = await patch<any>(
            `/meetings/${meetingId}/changePermissionChat`,
            payload,
        )
        return response.data
    },
}

export default serviceChatMeeting
