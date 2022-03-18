/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosResponse } from 'axios';
import frontendSettings from '../Helper/frontendSettings';

axios.defaults.baseURL = frontendSettings.ApiUrl;
axios.defaults.responseType = 'json';

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) =>
        axios
            .post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string, body: {}) => axios.delete(url, body).then(responseBody),
};
