import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllExamApi(token) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return axiosInstance.get(`${baseURL}exams/list`, { headers });
}

export function findOneExamApi(token, examId) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return axiosInstance.get(`${baseURL}exams/${examId}`, { headers });
}


export function submitExam(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return axiosInstance.post(`${baseURL}exams/submit`, data, { headers });
}