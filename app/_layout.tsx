import BlurredCircles from "@/components/blurred-circles";
import Button from "@/components/ui/button";
import tw from "@/lib/tailwind";
import HomeHeader from "@/modules/caregiver/components/home-header";
import { Stack, useRouter } from "expo-router";
import { KeyboardAvoidingView, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const router = useRouter()

  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <View style={tw`flex-1 flex-grow`} >
        <BlurredCircles />
        <Button text="Show Sitemap" onPress={() => router.push('/_sitemap')} />
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: tw`bg-transparent`,
          statusBarHidden: true
        }}>
          <Stack.Screen name='index' />
          <Stack.Screen
            name="login"
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="register"
            options={{
              animation: 'slide_from_right',
            }}
          />

          <Stack.Screen name="home" />

        </Stack>
        <Toast />
      </View>
    </GestureHandlerRootView >
  )
}
