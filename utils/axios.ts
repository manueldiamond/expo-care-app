import { deleteTokens, getAccessToken, getRefreshToken, saveTokens } from '@/modules/auth/auth-token-utils';
import axios from 'axios';
import API_ENDPOINTS, { BASE_BACKEND_URL } from './api';
import { extractApiError } from './api-error';

const api = axios.create({
  baseURL: BASE_BACKEND_URL,
  timeout: 10000,
});

// Attach JWT token to every request if available
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token && config.headers) {
      if (typeof config.headers.set === 'function') {
        // Axios v1: headers is an AxiosHeaders instance
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        // Fallback for plain object
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error)
  }
);

// Response interceptor for automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.data?.error === 'Token expired'||
      error?.response?.data?.error === 'Invalid token' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log('[RESPONSE INTERCEPTOR] Attempting token refresh...');
        const refreshToken = await getRefreshToken();
        console.log('[RESPONSE INTERCEPTOR] Retrieved refreshToken:', refreshToken);

        if (!refreshToken) {
          console.error('[RESPONSE INTERCEPTOR] No refresh token found. Throwing error.');
          throw new Error('Token Expired; No refresh token');
        }

        console.log('[RESPONSE INTERCEPTOR] Sending refresh request to:', API_ENDPOINTS.REFRESH);
        const refreshResponse = await api.post(API_ENDPOINTS.REFRESH, { refreshToken });

        const { tokens } = refreshResponse.data;
        console.log('[RESPONSE INTERCEPTOR] Extracted token from response:', tokens);

        if (!tokens?.accessToken || !tokens?.refreshToken) {
          console.error('[RESPONSE INTERCEPTOR] Invalid refresh response:', tokens);
          throw new Error('Invalid refresh response');
        }

        console.log('[RESPONSE INTERCEPTOR] Saving new tokens...');
        await saveTokens(tokens.accessToken, tokens.refreshToken);

        // Set new token for retry
        if (typeof originalRequest.headers.set === 'function') {
          console.log('[RESPONSE INTERCEPTOR] Setting Authorization header using headers.set');
          originalRequest.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
        } else {
          console.log('[RESPONSE INTERCEPTOR] Setting Authorization header as plain object');
          originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        }

        console.log('[RESPONSE INTERCEPTOR] Retrying original request with new token...');
        return api(originalRequest);
      } catch (refreshErr) {
        console.error('[RESPONSE INTERCEPTOR] Error during token refresh:', refreshErr);
        await deleteTokens();
        console.log('[RESPONSE INTERCEPTOR] Tokens deleted. Logging out user...');
        // Zustand global logout
        console.log('LOGGEDOUT!', extractApiError(refreshErr, "FAILED TO REFRESH, idk why"));
        const { logout } = require('@/stores/user-store').useUserStore.getState();
        logout();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 