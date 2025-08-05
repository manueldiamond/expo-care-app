import BlurredCircles from '@/components/blurred-circles';
import Loading from '@/components/loading';
import { useAuthCheck } from '@/hooks/use-auth-check';
import tw from '@/lib/tailwind';
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar, View } from 'react-native';

export default function AuthLayout() {
  const { loading } = useAuthCheck({
    redirectTo: '/home',
    onLoadingChange: (isLoading) => {
      // Optional: Handle loading state changes
    }
  });

  if (loading) {
    return (
      <View style={{flex:1}}>
        <BlurredCircles />
        <Loading message="" />
      </View>
    );
  }

  return (
    <>
      <StatusBar hidden={false} backgroundColor={tw.color('medical-primary/40')} />
      <BlurredCircles/>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_left',
          contentStyle:tw`bg-transparent`
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="role-select" />
      </Stack>
    </>
  );
} 