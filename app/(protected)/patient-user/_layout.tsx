import tw from '@/lib/tailwind';
import { Stack } from 'expo-router';

export default function PatientLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: tw.color('medical-primary') },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerTitleAlign: 'center',
      animation:'slide_from_right'
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="caregiver/[id]" options={{ title: 'Caregiver Profile' }} />
      <Stack.Screen name="search" options={{ headerShown:false }} />
    </Stack>
  );
} 