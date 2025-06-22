import tw from "@/lib/tailwind"
import { Text, View, TouchableOpacity, Image } from "react-native"
import { providers } from "../data"

const AuthProviders = ({ onPressProvider }) => (
	<View style={tw`flex-row gap-4`}>
		{providers.map(provider => (
			<TouchableOpacity onPress={() => onPressProvider(provider.name)} style={tw`px-10 py-[18px] bg-white flex-row centered gap-3 border border-border rounded-lg `}>
				<Image style={tw`w-[18px] h-[18px]`}
					source={{ uri: provider.image, }}
					resizeMode="contain"
				/>
				<Text style={tw`text-base font-light`}>{provider.name}</Text>
			</TouchableOpacity>))}
	</View>
)

export default AuthProviders
