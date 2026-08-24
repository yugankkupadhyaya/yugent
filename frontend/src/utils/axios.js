import axios from 'axios';

let tokenProvider;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const setClerkTokenProvider = (provider) => {
  tokenProvider = provider;
};

api.interceptors.request.use(async (config) => {
  if (tokenProvider) {
    const token = await tokenProvider();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
