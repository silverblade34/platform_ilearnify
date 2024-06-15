import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function createCourseApi(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.post(`${baseURL}courses/create`, data, { headers });
}

export function updateCourseApi(token, data, courseId) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.put(`${baseURL}courses/update/${courseId}`, data, { headers });
}