import { useAspectRatioSize, useLocalImageAspect } from "@/hooks"
import tw from "@/lib/tailwind"
import { useEffect, useMemo, useState } from "react"
import { Image, ImageSourcePropType, useWindowDimensions } from "react-native"

const topBlurImage = require('@/assets/images/blur-top.png')
const bottomBlurImage = require('@/assets/images/blur-bottom.png')

const BlurredCircles = ({ noTop = false, noBottom = false }) => {
	const screenWidth = useWindowDimensions().width

	const topSize = useAspectRatioSize(screenWidth, useLocalImageAspect(topBlurImage)).w
	const bottomSize = useAspectRatioSize(screenWidth * .8, useLocalImageAspect(bottomBlurImage)).w

	return (
		<>
			{!noTop && <Image
				source={topBlurImage}
				style={tw`absolute top-0 left-0 ${topSize}`}
			//resizeMode="contain"
			/>}

			{!noBottom && <Image
				source={bottomBlurImage}
				style={tw`absolute bottom-0 right-0 ${bottomSize}`}
				resizeMode="contain"
			/>}
		</>
	)
}
export default BlurredCircles
