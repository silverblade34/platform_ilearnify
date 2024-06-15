import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllUsersApi(token) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${baseURL}user/list`, { headers });
}