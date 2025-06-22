import tw from "@/lib/tailwind";
import { Text, View } from "react-native";

const AuthHeader = ({
	heading = '',
	subheading = 'Your trusted partner in holistic, patient- centered palliative care.'
}) => (
	<View className="my-10 centered">
		<Text style={tw`text-2xl`}>
			{heading}</Text>
		<Text style={tw`w-[206px]`}>
			{subheading}
		</Text>
	</View>
)

export default AuthHeader
