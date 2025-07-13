import tw from "@/lib/tailwind";
import { Text, TouchableOpacity, View } from "react-native";
import { Style } from "twrnc";

export default function Button({ textStyle, text, onPress, style, ghost = false, sm, }: {
	text: string;
	onPress: () => void;
	style?: Style;
	ghost?: boolean;
	textStyle?: Style;
	sm?: boolean;
}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}

		>
			<View
				style={tw.style(
					`rounded-lg centered px-6 flex`,
					ghost ? `bg-transparent` : `bg-black`,
					sm ? 'py-2.5 !h-[2px]' : 'h-[54px]',
					style
				)}
			>
				<Text style={[tw.style(
					`font-medium text-lg text-center`,
					ghost ? `text-black` : `text-white`,
					sm && 'text-xs'
				), textStyle
				]}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
}
