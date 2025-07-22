import { useAspectRatioSize, useLocalImageAspect } from "@/hooks"
import tw from "@/lib/tailwind"
import { Image, useWindowDimensions } from "react-native"

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
		<>
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
		</>
	)
}
export default BlurredCircles
