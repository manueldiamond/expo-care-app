import Button from "@/components/ui/button";
import tw from "@/lib/tailwind";
import { Stack, useRouter } from "expo-router";
import { Image, useWindowDimensions, View } from "react-native";
import { BlurView } from 'expo-blur'

export default function RootLayout() {
  const router = useRouter()

  return (
    <View style={tw`flex-1 flex-grow`} >
      {/*
 <Button text="Show Sitemap" onPress={() => router.push('/_sitemap')} />
      */}
      < Stack screenOptions={{
        headerShown: false,
        contentStyle: tw`bg-transparent`,
      }} />
    </View>
  )
}
