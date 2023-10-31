import { ICompany, IGetAllCompanyQuery } from "@/stores/company/type"
import { IGetAllDataReponse } from "./response.type"
import { get } from "./fetcher"

const serviceCompany = {
    getAllCompanys: async ({
        page,
        limit,
        filter,
    }: IGetAllCompanyQuery): Promise<IGetAllDataReponse<ICompany>> => {
        const payload = { page, limit, ...filter }
        const response: { data: IGetAllDataReponse<ICompany> } = await get(
            '/system-admin/get-all-companys',
            payload,
        )

        return response.data
    },
}

export default serviceCompany;