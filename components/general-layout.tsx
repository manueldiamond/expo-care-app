import BlurredCircles from "@/components/blurred-circles";
import tw from "@/lib/tailwind";
import { ReactChildren } from "@/types";
import { View } from "react-native";

export default function GeneralLayout({ children }: ReactChildren) {
	return (
		<View style={tw`flex-1`}>
			<BlurredCircles />
			{children}
		</View>
	)
}
