import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { getAccessToken } from '@/modules/auth/auth-token-utils';
import { useUserStore } from '@/stores/user-store';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function AuthLayout() {
  const loadProfile = useUserStore(s => s.loadProfile);
  console.log("AUTH LAYOUT TRIGGERED")

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        // Try to load profile to verify token is still valid
        const profileLoaded = await loadProfile();
        if (profileLoaded) {
          console.log("User already authenticated, redirecting to home");
          router.replace('/home');
        }
      }
    };

    checkAuthAndRedirect();
  }, [loadProfile]);

  return (
    <View style={tw`bg-white flex-1`}>
        <BlurredCircles/>
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle:tw`bg-transparent`
      }}
   / >
    </View>
  );
} 