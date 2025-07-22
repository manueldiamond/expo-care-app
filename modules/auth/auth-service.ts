import { deleteTokens, getRefreshToken, saveTokens } from '@/modules/auth/auth-token-utils';
import { useUserStore } from '@/stores/user-store';
import API_ENDPOINTS from '@/utils/api';
import { extractApiError } from '@/utils/api-error';
import api from '@/utils/axios';
import showToast from '@/utils/toast';

// Helper to load profile and set user
const loadAndSetUser = async (setUser: any) => {
  // Dynamically import to avoid cyclic import
  const loadProfile = useUserStore.getState().loadProfile;
  const success = await loadProfile();
  if (!success) {
    showToast.error('Failed to load user profile after login.');
    return false;
  }
  return true;
};

// Handles login with email and password
export const loginWithEmail = async (email: string, password: string, setUser: any, router: any) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
    const { token } = response.data;
    if (!token?.accessToken || !token?.refreshToken) {
      throw new Error('Invalid response from server');
    }
    await saveTokens(token.accessToken, token.refreshToken);
    const loaded = await loadAndSetUser(setUser);
    if (!loaded) return false;
    showToast.success('Welcome back!');
    router.push('/profile');
    return true;
  } catch (err: any) {
    console.log(err.request)
    const message = extractApiError(err, 'Login failed. Please try again.');
    showToast.error(message);
    return false;
  }
};

// Handles registration with email and password
export const registerWithEmail = async (fullname: string, email: string, password: string, role: string, setUser: any, router: any) => {
  try {
    const response = await api.post(API_ENDPOINTS.REGISTER, {
      fullname,
      email,
      password,
      role,
    });
    const { token } = response.data;
    if (!token?.accessToken || !token?.refreshToken) {
      throw new Error('Invalid response from server');
    }
    await saveTokens(token.accessToken, token.refreshToken);
    const loaded = await loadAndSetUser(setUser);
    if (!loaded) return false;
    showToast.success('Registration successful!');
    router.push('/profile');
    return true;
  } catch (err: any) {
    const message = extractApiError(err, 'Registration failed. Please try again.');
    showToast.error(message);
    return false;
  }
};

// Handles provider login/registration with provider token
export const loginWithProvider = async (provider: string, providerToken: string, setUser: any, router: any, isRegister = false) => {
  try {
    const response = await api.post(API_ENDPOINTS.PROVIDER_AUTH(provider), { token: providerToken });
    const { token } = response.data;
    if (!token?.accessToken || !token?.refreshToken) {
      throw new Error('Invalid response from server');
    }
    await saveTokens(token.accessToken, token.refreshToken);
    const loaded = await loadAndSetUser(setUser);
    if (!loaded) return false;
    showToast.success(
      isRegister ? 'Registration successful!' : 'Welcome!'
    );
    router.push('/profile');
    return true;
  } catch (err: any) {
    const message = extractApiError(err, 'Provider ' + (isRegister ? 'registration' : 'login') + ' failed. Please try again.');
    showToast.error(message);
    return false;
  }
};

// Refreshes the token using the refresh token
export const refreshToken = async () => {
  const refreshTokenValue = await getRefreshToken();
  if (!refreshTokenValue) return null;
  try {
    const response = await api.post(API_ENDPOINTS.REFRESH, { refreshToken: refreshTokenValue });
    const { user, token } = response.data;
    if (!user || !token?.accessToken || !token?.refreshToken) return null;
    await saveTokens(token.accessToken, token.refreshToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;
    return user;
  } catch {
    await deleteTokens();
    return null;
  }
}; 
