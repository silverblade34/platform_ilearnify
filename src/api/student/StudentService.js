import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function studentRegisterApi(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.post(`${baseURL}student/register`, data, { headers });
}


export function studentByIdApi(token, studentId) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${baseURL}student/${studentId}`, { headers });
}

export function updloadPredictiveStudentApi(payload) {
    return axiosInstance.post(`${baseURL}student/uploadPredictive`, payload);
}

export function getPredectiveStudentApi(studentId) {
    return axiosInstance.get(`${baseURL}student/predictive/${studentId}`);
}

export function studentUpdateApi(token, data, studentId) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.put(`${baseURL}student/update/${studentId}`, data, { headers });
}
