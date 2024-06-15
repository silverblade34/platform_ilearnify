import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllReportsExamsApi(token) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${baseURL}exams/result/all`, { headers });
}