import Loading from '@/components/loading';
import { useAuthCheck } from '@/hooks/use-auth-check';
import tw from '@/lib/tailwind';
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
  const { loading } = useAuthCheck({
    redirectTo: '/home',
    onLoadingChange: (isLoading) => {
      // Optional: Handle loading state changes
    }
  });

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  return (
    <>
      <StatusBar hidden={false} backgroundColor={tw.color('medical-primary')} />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_bottom'
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="role-select" />
      </Stack>
    </>
  );
} 