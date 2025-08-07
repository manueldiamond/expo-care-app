import { useAspectRatioSize, useLocalImageAspect } from "@/hooks"
import tw from "@/lib/tailwind"
import { Image, useWindowDimensions, View } from "react-native"

const topBlurImage = require('@/assets/images/blur-top.png')
const bottomBlurImage = require('@/assets/images/blur-bottom.png')

type BlurredCirclesProps = {
	topStyle?: any;
	bottomStyle?: any;
	noTop?: boolean;
	noBottom?: boolean;
};

const BlurredCircles = ({ topStyle, bottomStyle, noTop = false, noBottom = false }: BlurredCirclesProps) => {
	const screenWidth = useWindowDimensions().width

	const topSize = useAspectRatioSize(screenWidth, useLocalImageAspect(topBlurImage)).w
	const bottomSize = useAspectRatioSize(screenWidth * .8, useLocalImageAspect(bottomBlurImage)).w

	return (

	<View style={tw`absolute top-0 left-0 w-full h-full bg-white`}>
			{!noTop && <Image
				source={topBlurImage}
				style={[tw`absolute top-0 left-0 ${topSize}`,topStyle]}
			//resizeMode="contain"
			/>}
			{!noBottom && <Image
				source={bottomBlurImage}
				style={[tw`absolute bottom-0 right-0 opacity-50 ${bottomSize}`,bottomStyle]}
				resizeMode="contain"
			/>}
		</View>
	)
}
export default BlurredCircles
