import Intro from "@/components/intro";
import tw from "@/lib/tailwind";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Intro />
    </View>
  );
}
