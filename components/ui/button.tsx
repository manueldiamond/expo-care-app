import tw from "@/lib/tailwind";
import { Text, TouchableOpacity, View } from "react-native";

export default function Button({ text, onPress, style, ghost = false }: {
	text: string;
	onPress: () => void;
	style?: object;
	ghost?: boolean;
}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
		>
			<View
				style={tw.style(
					`rounded-lg py-[18px] px-6 flex`,
					ghost ? `bg-transparent` : `bg-black`,
					style
				)}
			>
				<Text style={tw.style(
					`font-medium text-lg text-center`,
					ghost ? `text-black` : `text-white`
				)}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
}
