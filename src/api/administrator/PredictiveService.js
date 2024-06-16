import axiosInstance from '@/config/http.config';

const baseURL = process.env.VUE_APP_BASE_URL_ANALYSIS;

export function findLogisticRegression() {
    console.log("-----------------------------------1");
    console.log(baseURL);
    return axiosInstance.get(`${baseURL}logistic_regression/predict`);
}

export function findDecisionTree() {
    return axiosInstance.get(`${baseURL}decision_tree/predict`);
}