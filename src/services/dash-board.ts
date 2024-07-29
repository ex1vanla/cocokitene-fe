import { IMeeting } from '@/stores/meeting/types';
import { IGetAllMeetingInDayPayload } from './request.type';
import { IGetAllDataReponse } from './response.type';
import { get } from './fetcher';



const serviceDashBoard = {
    getAllMeetingInDay: async ({
        page,
        limit,
        date, 
    }: IGetAllMeetingInDayPayload): Promise<IGetAllDataReponse<IMeeting>> => {
        const payload = { page, limit, date }
        const response: {data: IGetAllDataReponse<IMeeting>} = await get(
            '/dash-board/meeting-in-day',
            payload,
        )

        return response.data
    }
}

export default serviceDashBoard