import { AxiosResponse } from 'axios';
import { instance } from './axios';
// import serviceUser from './user'
import { notification } from "antd";
import { ApiResponse } from './request.type';

type Obj = { [key: string]: any }

instance.interceptors.request.use(
    (config) => {
        // const token = serviceUser.getAccessToken()
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${token}`
        // }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data
    },
    function (error) {
        const status = error.response ? error.response.status : null
        const message = error.response ? error.response.data.message : 'error'
        if (status === 401) {
            notification.error({
                message: message,
                description: 'Please handle accordingly.',
            })
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    },
)

function get<T, R = ApiResponse<T>>(route: string, params?: Obj): Promise<R> {
    return instance.get(route, { params })
}

function post<T, R = ApiResponse<T>>(route: string, payload?: Obj): Promise<R> {
    return instance.post(route, payload)
}

function put<T, R = ApiResponse<T>>(route: string, payload?: Obj): Promise<R> {
    return instance.put(route, payload)
}

function patch<T, R = ApiResponse<T>>(
    route: string,
    payload?: Obj,
): Promise<R> {
    return instance.patch(route, payload)
}

function del<T, R = ApiResponse<T>>(route: string): Promise<R> {
    return instance.delete(route)
}

function upload<T, R = ApiResponse<T>>(
    route: string,
    payload: Obj,
): Promise<R> {
    const formData = new FormData()

    function appendFormData(nameInput: string, array: Array<any>): void {
        for (let i = 0; i < array.length; i += 1) {
            formData.append(nameInput, array[i])
        }
    }

    const keysData = Object.keys(payload)

    if (keysData.length > 0) {
        for (let i = 0; i < keysData.length; i += 1) {
            const keyItem = keysData[i]
            if (Array.isArray(payload[keyItem])) {
                appendFormData(keyItem, payload[keyItem])
            } else {
                formData.append(keyItem, payload[keyItem])
            }
        }
    }

    return instance.post(route, formData)
}

export { del, get, patch, post, put, upload };

