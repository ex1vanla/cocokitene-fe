import { Cookies } from 'react-cookie'
import { get } from './fetcher'
const cookies = new Cookies()

const serviceUser = {
    getNonce: async (walletAddress: string) => {
        const response = await get('/users', {
            walletAddress,
        })
        const nonce = response.data

        return nonce
    },
}

export default serviceUser;
