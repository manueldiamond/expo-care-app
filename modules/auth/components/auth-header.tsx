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
		<Text style={tw` text-[${align}] font-medium text-2xl`}>
		{heading}
		</Text>

		<Text style={tw` w-[206px] text-[${align}] mx-auto`}>
			{subheading}
		</Text>
	</View>
);

export default AuthHeader
