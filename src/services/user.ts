import { get } from './fetcher'
import { IAccountListResponse } from './response.type'

const serviceUser = {
    getNonce: async (walletAddress: string) => {
        const response = await get('/users', {
            walletAddress,
        })
        const nonce = response.content

        return nonce
    },

    getAccountList: async (
        query?: string,
        page: number = 1,
        limit: number = 5,
    ): Promise<IAccountListResponse> => {
        const params = {
            searchQuery: query,
            limit,
            page,
        }
        const response = await get<any, { data: IAccountListResponse }>(
            '/users',
            params,
        )
        return response.data
    },
}

export default serviceUser
