import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || "/api", timeout: 20000 });
api.interceptors.request.use(config => {
    const token = sessionStorage.getItem("sessionToken");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});
api.interceptors.response.use(response => response, error => {
    if (error.response?.status === 401 && !error.config?.url?.endsWith("/auth/login")) {
        sessionStorage.removeItem("sessionToken");
        window.location.assign("/login");
    }
    return Promise.reject(error);
});
export default api;
