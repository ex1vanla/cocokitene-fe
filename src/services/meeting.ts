import { IGetAllMeetingQuery, IMeeting } from "@/stores/meetings/type";
import { IGetAllDataReponse } from "./response.type";
import { get } from "./fetcher";

const serviceMeeting = {
    getAllMeetings: async ({page, limit, type, searchQuery, sortOrder}: IGetAllMeetingQuery) => {
        const response = await get<IGetAllDataReponse<IMeeting>>('/meetings', {
            type,
            page,
            limit,
            searchQuery,
            sortOrder
        });
        return response.data;
    }
}

export default serviceMeeting;