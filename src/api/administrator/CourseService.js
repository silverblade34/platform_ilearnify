import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function createCourseApi(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.post(`${baseURL}courses/create`, data, { headers });
}