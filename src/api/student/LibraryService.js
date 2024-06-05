import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllUsersDocumentApi(token, page, limit, search) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const searchValidate = search ? search: "";
    return axiosInstance.get(`${baseURL}library/user-documents?page=${page}&limit=${limit}&search=${searchValidate}`, { headers });
}
