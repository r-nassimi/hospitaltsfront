import axios from 'axios';
import Store from 'src/store/store';
import { API_URL } from "src/constants";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true;
    await Store.refresh();
    return api.request(originalRequest);
  } else {
    throw error;
  };
});

export default api; 