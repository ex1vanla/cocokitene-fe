import { IMeeting } from "@/stores/meetings/type"
import { IGetAllDataReponse } from "./response.type"
import { post } from "./fetcher"
import { IAttendanceMeeting } from "@/stores/attendance/type"

const attendanceMeeting = {
    attendanceMeeting: async (meetingId: number) => {
        const response = await post<IGetAllDataReponse<IAttendanceMeeting>>('/meetings/attendance-meeting', {
            meetingId
        })
        return response.data;
    }
}

export default attendanceMeeting;