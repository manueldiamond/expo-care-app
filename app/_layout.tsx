import BlurredCircles from "@/components/blurred-circles";
import tw from "@/lib/tailwind";
import { Stack } from 'expo-router';
import React from 'react';
import { View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  console.log("DEBUG: ROOT LAYOUT TRIGGERED")

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
      <View style={tw`flex-1 bg-white flex-grow`} >
         <BlurredCircles />

         <Stack
           screenOptions={{
             headerShown: false,
             contentStyle: tw`bg-transparent`,
           }}
         />
                  
         <Toast avoidKeyboard />
       </View>
     </GestureHandlerRootView >
   )
}
