// import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { instance } from './axios'
// import serviceUser from './user'
import serviceUser from './user'
import { ApiResponse } from './response.type'

type Obj = { [key: string]: any }

instance.interceptors.request.use(
    (config) => {
        const accessToken = serviceUser.getAccessTokenStorage()
        if (
            !!accessToken &&
            config.headers &&
            !config.headers['Authorization']
        ) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    (response) => {
        const { status, data } = response

        if (status === 200 || status === 201) {
            return data
        }

        return Promise.reject(data)
    },
    async (error: any) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true
            const newAccessToken = await serviceUser.getRefreshToken()
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return instance(prevRequest)
        }

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

export { del, get, patch, post, put, upload }
