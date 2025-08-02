import Button from "@/components/ui/button";
import tw from "@/lib/tailwind";
import { ReactNode } from "react";
import { Text, View } from "react-native";


interface ForgotPasswordLayoutProps {
	heading: string
	subheading: string
	body: ReactNode
	buttonText: string
	onButtonClick: () => void
}

const ForgotPasswordLayout = ({
	heading,
	subheading,
	body,
	buttonText,
	onButtonClick
}: ForgotPasswordLayoutProps) => {
	return (
		<View style={tw`container py-10`}>
			<View style={tw`gap-3`}>
				<Text style={tw`text-left font-medium text-2xl`}>
					{heading}
				</Text>
				<Text style={tw` text-left mx-auto text-soft font-normal`}>
					{subheading}
				</Text>
			</View>
			<View style={tw`flex1 my-[30px]`}>
				{body}
			</View>
			<Button
				style={tw``}
				text={buttonText}
				onPress={onButtonClick}
			/>
		</View>
	)
}

export default ForgotPasswordLayout 
