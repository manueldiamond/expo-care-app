import tw from "@/lib/tailwind";
import { Text, TouchableOpacity, View } from "react-native";
import { Style } from "twrnc";

export default function Button({ textStyle, text, onPress, style, ghost = false, sm, disabled = false, children }: {
	text: string;
	onPress: () => void | Promise<void>;
	style?: Style;
	ghost?: boolean;
	textStyle?: Style;
	sm?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			disabled={disabled}
		>
			<View
				style={tw.style(
					`rounded-lg centered px-6 flex`,
					ghost ? `bg-transparent` : `bg-black`,
					sm ? 'py-2.5 !h-[2px]' : 'h-[54px]',
					disabled && 'opacity-50',
					style
				)}
			>
				{children}
				{!children && (
					<Text style={[tw.style(
						`font-medium text-lg text-center`,
						ghost ? `text-black` : `text-white`,
						sm && 'text-xs'
					), textStyle
					]}>{text}</Text>
				)}
			</View>
		</TouchableOpacity>
	);
}
