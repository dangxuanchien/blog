import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { ApiHandler } from 'utils/api';

export class RequestService {
    private axiosInstance: AxiosInstance;
    constructor(baseURL: string | undefined) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.preRequest();
        this.preResponse();
    }

    private preRequest() {
        this.axiosInstance.interceptors.request.use((config: any) => {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
                },
            };
        });
    }

    private preResponse() {
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    get<T>(url: string, config?: AxiosRequestConfig) {
        if (ApiHandler.isApiWithoutLoading(url)) {
            return this.axiosInstance.get<T>(url, config);
        }
        return trackPromise(this.axiosInstance.get<T>(url, config));
    }
    post<T>(url: string, body: {}, config?: AxiosRequestConfig) {
        if (ApiHandler.isApiWithoutLoading(url)) {
            return this.axiosInstance.post<T>(url, body, config);
        }
        return trackPromise(this.axiosInstance.post<T>(url, body, config));
    }

    put<T>(url: string, body: {}, config?: AxiosRequestConfig) {
        if (ApiHandler.isApiWithoutLoading(url)) {
            return this.axiosInstance.put<T>(url, body, config);
        }
        return trackPromise(this.axiosInstance.put<T>(url, body, config));
    }

    del<T>(url: string, config?: AxiosRequestConfig) {
        if (ApiHandler.isApiWithoutLoading(url)) {
            return this.axiosInstance.delete<T>(url, config);
        }
        return trackPromise(this.axiosInstance.delete<T>(url, config));
    }
}
export const httpRestIF = new RequestService(process.env.NEXT_PUBLIC_REST_IF_API_URL);
export default new RequestService(process.env.NEXT_PUBLIC_API_URL);
