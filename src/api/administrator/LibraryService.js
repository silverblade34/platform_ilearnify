import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function createDocumentApi(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    };
    const formData = new FormData();
    formData.append('course_id', data.course_id);
    formData.append('document_title', data.document_title);
    formData.append('document_description', data.document_description);
    formData.append('document', data.document);
    return axiosInstance.post(`${baseURL}library/create`, formData, { headers });
}