import tw from "@/lib/tailwind";
import { Image, View } from "react-native";
import { placeholderProfileImage } from "../data";


export default function Avatar({ size = 64 }: { size?: number }) {
	const profileURL = ''; // Replace with your logic to get the profile URL
	return (
		<View style={tw`w-[${size}px] h-[${size}px] rounded-full overflow-hidden`}>
			{/* Replace with your image source */}
			<Image
				source={profileURL ? { uri: profileURL } : placeholderProfileImage}
				style={tw`flex-1 w-full h-full`}
				resizeMode="cover"
			/>
		</View>
	)
}
