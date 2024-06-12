import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllRatingsApi(token, userId) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    console.log(`${baseURL}exams/results/student/${userId}`)
    return axiosInstance.get(`${baseURL}exams/results/student/${userId}`, { headers });
}
