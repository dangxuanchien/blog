import { ApiHandler } from '@/utils/api';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { trackPromise } from 'react-promise-tracker';
import StorageUtils from 'utils/storage';
import HttpStatusCode from './HttpStatusCode';

export const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const createAxios = (baseURL: string) => {
    const axiosClient = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosClient.interceptors.request.use(
        async (config) => {
            const token = StorageUtils.get('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    axiosClient.interceptors.response.use(
        async (response) => {
            return response.data;
        },
        (error: AxiosError) => {
            let result = {};

            const status = error.response?.status;
            const errorMessage = (error?.toJSON() as any)?.message || 'Error';

            switch (status) {
                case HttpStatusCode.BAD_REQUEST:
                case HttpStatusCode.INTERNAL_SERVER_ERROR:
                case HttpStatusCode.SERVICE_UNAVAILABLE:
                case HttpStatusCode.FORBIDDEN:
                case HttpStatusCode.UNAUTHORIZED:
                case HttpStatusCode.NOT_FOUND:
                default:
                    result = {
                        errorMessage: error.message,
                    };
                    break;
            }
            return Promise.reject({ errorMessage, result });
        }
    );

    const responseBody = <T>(response: AxiosResponse<T>) => response.data;

    return {
        get<T>(url: string, config?: AxiosRequestConfig) {
            if (ApiHandler.isApiWithoutLoading(url)) {
                return axiosClient.get<T>(url, config).then(responseBody);
            }
            return trackPromise(axiosClient.get<T>(url, config).then(responseBody));
        },
        post<T = any>(url: string, body: {}, config?: AxiosRequestConfig) {
            if (ApiHandler.isApiWithoutLoading(url)) {
                return axiosClient.post<T>(url, body, config).then(responseBody);
            }
            return trackPromise(axiosClient.post<T>(url, body, config).then(responseBody));
        },
        put<T>(url: string, body: {}, config?: AxiosRequestConfig) {
            if (ApiHandler.isApiWithoutLoading(url)) {
                return axiosClient.put<T>(url, body, config).then(responseBody);
            }
            return trackPromise(axiosClient.put<T>(url, body, config).then(responseBody));
        },
        del<T>(url: string, config?: AxiosRequestConfig) {
            if (ApiHandler.isApiWithoutLoading(url)) {
                return axiosClient.delete<T>(url, config).then(responseBody);
            }
            return trackPromise(axiosClient.delete<T>(url, config).then(responseBody));
        },
    };
};

export const httpRestIF = createAxios(process.env.NEXT_PUBLIC_REST_IF_API_URL!);
export default createAxios(process.env.NEXT_PUBLIC_API_URL!);
