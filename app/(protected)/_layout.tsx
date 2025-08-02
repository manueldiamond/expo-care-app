import tw from '@/lib/tailwind';
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function ProtectedLayout() {

  console.log("PROTECTED LAYOUT TRIGGERED")
  /*
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        showToast.error('Not logged in', 'You must be logged in to access this page');
        console.log("NO TOKEN GO BACK TO LOGIN")
        router.replace('/login');
      } else {
        console.log("TOKEN FOUND!")
      }
    };
    checkAuth();
  }, []);
*/
  return (
    <>
      <StatusBar hidden={false} backgroundColor={tw.color('medical-primary')} />
      <Stack 
        screenOptions={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: tw.color('medical-primary'),
          },
          headerTintColor: 'white',
          headerTitleStyle: tw`text-lg  font-semibold`,
          headerTitleAlign: 'center',
          animation:'slide_from_bottom'
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="add-records" 
          options={{
            title: 'Add Records',
          }}
        />
        <Stack.Screen 
          name="medical-record" 
          options={{
            title: 'Medical Record',
          }}
        />
        <Stack.Screen 
          name="book-appointment" 
          options={{
            title: 'Book Appointment',
          }}
        />
        <Stack.Screen 
          name="patient" 
          options={{
            title: 'Patient Details',
          }}
        />
        <Stack.Screen 
          name="profile" 
          options={{
            title: 'Profile',
          }}
        />
        <Stack.Screen 
          name="profile/personal-info" 
          options={{
            title: 'Personal Info',
          }}
        />
        <Stack.Screen 
          name="profile/medical-info" 
          options={{
            title: 'Medical Info',
          }}
        />
        <Stack.Screen 
          name="profile/caregiver-details" 
          options={{
            title: 'Caregiver Details',
          }}
        />
        <Stack.Screen 
          name="profile/identity-verification" 
          options={{
            title: 'Identity Verification',
          }}
        />
      </Stack>
    </>
  );
} 