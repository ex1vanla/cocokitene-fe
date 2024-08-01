import { IMeeting } from '@/stores/meeting/types';
import { IGetAllMeetingInDayPayload } from './request.type';
import { IGetAllDataReponse, IStatisticMeetingInMonthResponse } from './response.type';
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
    },
    getStatisticMeetingInMonth: async ({
        date
    }:{date:Date}): Promise<IStatisticMeetingInMonthResponse> =>{
        const payload = { date }
        const response: {data: IStatisticMeetingInMonthResponse} = await get<IStatisticMeetingInMonthResponse>('/dash-board/meeting-in-month/statistics',payload)
        return response.data
    }
}


export default serviceDashBoard