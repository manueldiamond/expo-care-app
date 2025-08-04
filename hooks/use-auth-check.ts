import { getAccessToken } from '@/modules/auth/auth-token-utils';
import { useUserStore } from '@/stores/user-store';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

interface UseAuthCheckOptions {
  redirectTo?: string;
  onLoadingChange?: (loading: boolean) => void;
}

export const useAuthCheck = (options: UseAuthCheckOptions = {}) => {
  const router = useRouter();
  const loadProfile = useUserStore(s => s.loadProfile);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { redirectTo = '/home', onLoadingChange } = options;

  const checkAuthAndRedirect = async () => {
    try {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setLoading(true);
        onLoadingChange?.(true);
        
        // Try to load profile to verify token is still valid
        const profileLoaded = await loadProfile();
        if (profileLoaded) {
          console.log("User already authenticated, redirecting to:", redirectTo);
          setIsAuthenticated(true);
          router.replace(redirectTo as any);
        } else {
          console.log("Token invalid, staying on current page");
          setIsAuthenticated(false);
        }
      } else {
        console.log("No access token found");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  return {
    loading,
    isAuthenticated,
    checkAuthAndRedirect
  };
}; 