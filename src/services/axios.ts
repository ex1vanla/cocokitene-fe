import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
