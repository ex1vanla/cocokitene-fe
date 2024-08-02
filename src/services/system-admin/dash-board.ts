import { get } from "./fetcher-system"
import { IStatisticCompanyResponse } from "./response.type"


const serviceDashBoard = {
    getStatistical: async (): Promise<IStatisticCompanyResponse> => {
        const response:{data: IStatisticCompanyResponse} = await get<IStatisticCompanyResponse>('/system-admin/statistical')

        return response.data
    }
}

export default serviceDashBoard