import tw from "@/lib/tailwind";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { useState } from "react";
import { usePrefetchImages } from "@/hooks";
import data from "./data";
import BlurredCircles from "@/components/blurred-circles";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";



export function Intro() {
	const [page, setPage] = useState(0);
	const router = useRouter()
	const { image: imageSource, heading, paragraph } = data[page];
	const onButtonPress = () => {
		if (page < data.length - 1) {
			setPage(page + 1);
		} else {
			navaigateToMainApp();
		}
	}
	const navaigateToMainApp = () => {
		router.push('/register')
	};


	const buttonText = page < data.length - 1 ? "Next" : "Get Started";

	const { width } = useWindowDimensions()
	const imgSize = width - 20 * 2
	const blueCircleSize = imgSize * 1.05

	//prefetch images for faster loading
	usePrefetchImages(data.map(i => i.image))

	return (
		<View style={tw`flex-1 justify-center items-center`}>
			<View style={tw`container flex-1 justify-center relative items-center`}>
				<View
					style={tw.style(
						`size-[${blueCircleSize}px] top-0 rounded-full 
					bg-[#007AFF26] absolute
					left-[-${blueCircleSize * 0.3}px]
					top-[-${blueCircleSize * 0.025} px]
				`)}
				/>

				<View style={tw`flex-1 flex-grow centered `}>
					<Image
						source={imageSource}
						style={tw`rounded-full h-[${imgSize}px] w-[${imgSize}px] mb-8`}
					/>
					<Text style={tw`text-2xl text-center font-bold mt-4`}>
						{heading}
					</Text>
					<Text style={tw`text-base text-soft mt-2 text-center`}>
						{paragraph}
					</Text>
				</View>
				<View style={tw`mb-[56px] min-w-full flex flex-col`}>
					<Button
						text={buttonText}
						onPress={onButtonPress}
					/>
					<Button
						ghost
						text='Skip'
						style={tw``}
						onPress={navaigateToMainApp}
					/>
				</View>
			</View >
		</View >
	);
}
