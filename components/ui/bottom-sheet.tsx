import tw from "@/lib/tailwind";
import { Modal, Text, View } from "react-native";

export default function BottomSheet({ heading, children }) {
	return (
		<Modal animationType="slide" transparent style={tw`flex-1 justify-end	`} >
			<View style={tw.style("rounded-t-[30px] container bg-white")}>
				<View style={tw`mt-5 mb-[55px]`} />
				<Text style={tw`font-medium text-2xl`}>{heading}</Text>
				{children}
			</View>
		</Modal >
	)
}
