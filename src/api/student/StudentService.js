import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function studentRegisterApi(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.post(`${baseURL}student/register`, data, { headers });
}
