import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function createExamApi(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return axiosInstance.post(`${baseURL}exams/create`, data, { headers });
}