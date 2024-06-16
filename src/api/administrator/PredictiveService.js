import axiosInstance from '@/config/http.config';

const baseURLPrediction = process.env.VUE_APP_BASE_URL_ANALYSIS;

export function findLogisticRegression() {
    return axiosInstance.get(`${baseURLPrediction}predict_logistic_regression`);
}

export function findDecisionTree() {
    return axiosInstance.get(`${baseURLPrediction}predict_decision_tree`);
}

export function findMetrics() {
    return axiosInstance.get(`${baseURLPrediction}metrics`);
}