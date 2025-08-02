import BlurredCircles from "@/components/blurred-circles";
import tw from "@/lib/tailwind";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  console.log("DEBUG: ROOT LAYOUT TRIGGERED")

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
    'Roboto-Bold': Roboto_700Bold,
    'OpenSans-Regular': OpenSans_400Regular,
    'OpenSans-SemiBold': OpenSans_600SemiBold,
    'OpenSans-Bold': OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  /*
   useEffect(() => {
    const checkInitialAuth = async () => {
      const accessToken = await getAccessToken();
      console.log("ACCESS=",accessToken);
      if (accessToken) {
        // Try to load profile to verify token is still valid
        const profileLoaded = await loadProfile();
        if (profileLoaded) {
          console.log("User authenticated, redirecting to home");
          router.replace('/home');
        } else {
          console.log("Token invalid, staying on current screen");
        }
      }
      setChecking(false);
    };

    checkInitialAuth();
  }, [loadProfile, router]); 
  */

  return (
    <GestureHandlerRootView style={tw`flex-1 bg-white`}>
      <SafeAreaView style={tw`flex-1 bg-white flex-grow`} >

         <BlurredCircles />

         <Stack
           screenOptions={{
             headerShown: false,
             contentStyle: tw`bg-transparent`,
           }}
         />
                  
         <Toast avoidKeyboard />
       </SafeAreaView>
     </GestureHandlerRootView >
   )
}
