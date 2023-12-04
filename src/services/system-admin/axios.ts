import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});