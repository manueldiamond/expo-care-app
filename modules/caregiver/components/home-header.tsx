import tw from "@/lib/tailwind";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "./avatar";

export default function HomeHeader() {
	// 1. Top Bar

	//App Logo or Name

	//A small profile/avatar icon (goes to account)

	//Notification bell (for messages, bookings)
	return (
		<View style={tw`flex-row items-center justify-between  container border-b  border-white/80  py-2`}>
			<Text style={tw`text-dark text-xl font-bold`}>Family Care</Text>
			<View style={tw`flex-row items-center`}>

				<TouchableOpacity style={tw`p-2`}>
					<FontAwesome name="bell" size={20} color={tw.color('soft')} />
				</TouchableOpacity>

				<TouchableOpacity 
				onPress={()=>router.push('/profile')} 
				style={tw`p-2`}
			>
					<Avatar size={32} />
				</TouchableOpacity>

			</View>
		</View>

	)
}
