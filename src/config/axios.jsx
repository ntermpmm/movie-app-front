import axios from "axios";
import { API_ENDPOINT_URL } from "../config/env";
import { getAccessToken } from "../services/localStorage";

axios.defaults.baseURL = API_ENDPOINT_URL;

axios.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
