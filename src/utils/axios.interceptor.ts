import { BASE_API_URL } from '@/constants';
import { useAuthStore } from '@/stores';
import axios from 'axios';

axios.defaults.baseURL = BASE_API_URL;

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore.getState();
  const token = authStore?.auth?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error?.response;
    const message =
      response?.data?.errors ?? response?.data?.message ?? error.message;

    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/app')) {
        localStorage.removeItem('auth');
        window.location.href = '/login';
      }
    }

    return Promise.reject({
      status: error.response?.status,
      message: message,
      data: error.response?.data,
    });
  },
);
