import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllExplorerCoursesApi(token) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${baseURL}courses/listAll`, { headers });
}

export function enrollCourseApi(token, courseId) {
    const data = {
        course_id: courseId
    }
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.post(`${baseURL}courses/enroll`, data, { headers });
}
