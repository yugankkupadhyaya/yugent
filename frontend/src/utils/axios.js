import axios from 'axios';

let tokenProvider;
const tokenProviderWaiters = new Set();
const TOKEN_PROVIDER_WAIT_MS = 5000;

const api = axios.create({
  baseURL: import.meta.env?.VITE_BACKEND_URL,
  withCredentials: true,
});

export const setClerkTokenProvider = (provider) => {
  tokenProvider = typeof provider === 'function' ? provider : undefined;

  tokenProviderWaiters.forEach((resolve) => resolve(tokenProvider));
  tokenProviderWaiters.clear();
};

function waitForTokenProvider() {
  if (tokenProvider) return Promise.resolve(tokenProvider);

  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => {
      tokenProviderWaiters.delete(resolveProvider);
      resolve(undefined);
    }, TOKEN_PROVIDER_WAIT_MS);

    function resolveProvider(provider) {
      window.clearTimeout(timeoutId);
      resolve(provider);
    }

    tokenProviderWaiters.add(resolveProvider);
  });
};

api.interceptors.request.use(async (config) => {
  const provider = tokenProvider || (await waitForTokenProvider());

  if (provider) {
    const token = await provider();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
