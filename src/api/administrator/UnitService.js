import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function createUnitApi(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return axiosInstance.post(`${baseURL}units/create`, data, { headers });
}