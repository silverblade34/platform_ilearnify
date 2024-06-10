import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function createMaterialApi(token, data) {
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    };
    const formData = new FormData();
    formData.append('unit_id', data.unit_id);
    formData.append('course_id', data.course_id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('file', data.file);
    return axiosInstance.post(`${baseURL}material/create`, formData, { headers });
}