import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function loginApi(username, password) {
    return axios.post(`${baseURL}user/login`,
        {
            username,
            password
        })
}

export function recoverPasswordApi(username) {
    return axios.post(`${baseURL}user/recover-password`,
        {
            username,
        })
}