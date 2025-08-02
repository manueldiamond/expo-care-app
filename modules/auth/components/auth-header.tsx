import tw from "@/lib/tailwind";
import { Text, View } from "react-native";

const AuthHeader = ({
	heading = '',
	subheading = 'Your trusted partner in holistic, patient- centered palliative care.',
	align = 'center'
}: {
	heading?: string;
	subheading?: string;
	align?: 'left' | 'center' | 'right';
}) => (
	<View style={tw`my-10 centered`}>
		<Text style={tw` text-[${align}] font-medium text-2xl text-medical-text`}>
		{heading}
		</Text>

		<Text style={tw` text-center w-[260px] text-[${align}] mx-auto font-medium text-xs text-medical-text-light`}>
			{subheading}
		</Text>
	</View>
);

export default AuthHeader
