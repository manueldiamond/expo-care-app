import BlurredCircles from '@/components/blurred-circles';
import Loading from '@/components/loading';
import tw from '@/lib/tailwind';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function ProtectedLayout() {
  const [isLoading, setIsLoading] = useState(true);

  console.log("PROTECTED LAYOUT TRIGGERED")
  
  useEffect(() => {
    // Simulate auth check delay
    const checkAuth = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    checkAuth();
  }, []);

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

  if (isLoading) {
    return (

      <View style={{flex:1}}>
        <BlurredCircles />
        <Loading message="" />
      </View>
    )
  }

  return (
    <>
      <Stack 
        screenOptions={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: tw.color('medical-primary'),
          },
          headerTintColor: 'white',
          headerTitleStyle: tw`text-lg  font-semibold`,
          headerTitleAlign: 'center',
          animation:'slide_from_bottom',
          headerBackTitle:'Back'
        }}
      >
        <Stack.Screen name="home" options={{headerShown:false, animation:'fade'}} />
        <Stack.Screen name="patients" options={{ headerShown: false }} />
        <Stack.Screen name="add-records" options={{ title: 'Add Records' }} />

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
          name="notifications" 
          options={{
            title: 'Notifications',
          }}
        />

        <Stack.Screen 
          name="patient" 
          options={{
            title: 'Patient Details',
          }}
        />

        <Stack.Screen 
          name="patient/[slug]" 
          options={{
            title: 'Patient Details',
          }}
        />

        <Stack.Screen 
          name="caregiver-user/(tabs)" 
          options={{
            headerShown: false,
            animation:'fade',
            title:'Caregiver'
          }}
        />

    <Stack.Screen 
          name="caregiver-user/" 
          options={{
            headerShown: false,
            animation:'fade',
            title:'Caregiver'
          }}
        />
        <Stack.Screen 
          name="caregiver-user/patients" 
          options={{
            title: 'Patients',
          }}
        />

        <Stack.Screen 

          name="patient-user" 
          options={{
            headerShown: false,
            animation:'fade',
            title:'Patient'
          }}
        />

        <Stack.Screen 
          name="chat" 
          options={{
            headerShown:false,
          }}
        />

        <Stack.Screen 
          name="chat/[id]" 
          options={{
            title: 'Chat',
            headerShown:false,
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
          name="profile/qualification-details" 
          options={{
            title: 'Qualification Details',
          }}
        />
        <Stack.Screen 
          name="profile/qualifications" 
          options={{
            title: 'Qualifications',
          }}
        />
        <Stack.Screen 
          name="profile/identity-verification" 
          options={{
            title: 'Identity Verification',
          }}
        />
        <Stack.Screen 
          name="profile/begin-verification" 
          options={{
            title: 'Verification',
          }}
        />


      </Stack>
    </>
  );
} 