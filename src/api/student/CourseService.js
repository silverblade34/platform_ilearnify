import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllCourseUnitsApi(token, idCourse) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${baseURL}units/${idCourse}`, { headers });
}