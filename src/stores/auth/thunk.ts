import serviceUser from '@/services/user'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getNonceThunk = createAsyncThunk(
    'auth/getNonce',
    async (walletAddress: string) => {
        const nonce = await serviceUser.getNonce(walletAddress)
        return nonce
    },
)
