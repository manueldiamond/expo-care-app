import tw from "@/lib/tailwind"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { providers } from "../data"

const AuthProviders = ({ onPressProvider }) => (
	<View style={tw`flex-row gap-4`}>
		{providers.map(provider => (
			<TouchableOpacity key={provider.name} onPress={() => onPressProvider(provider.name)} style={tw`centered flex-1 py-[18px] bg-white flex-row centered gap-3 shadow-xl shadow-[rgba(0,0,0,0.2)] rounded-lg `}>
				<Image style={tw`w-[18px] h-[18px]`}
					source={provider.image}
					resizeMode="contain"
				/>
				<Text style={tw`text-base font-light`}>{provider.name}</Text>
			</TouchableOpacity>))}
	</View>
)

export default AuthProviders
