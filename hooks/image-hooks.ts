import { useEffect, useMemo, useState } from "react"
import { Image, ImageSourcePropType, Platform } from "react-native"

export const useImageAspectRatio = (uri: string) => {
	const [ratio, setRatio] = useState(1)

	useEffect(() => {
		Image.getSize(
			uri,
			(w, h) => setRatio(w / h),
			() => setRatio(1)
		)
	}, [uri])

	return ratio
}

export const useLocalImageAspect = (image: ImageSourcePropType) =>
	useMemo(() => {
		const { width, height } = Image.resolveAssetSource(image)
		return width / height
	}, [image])

export const useAspectRatioSize = (size: number, AR: number) => useMemo(() => ({
	w: `w-[${size}px] h-[${size / AR}px]`,
	h: `h-[${size}px] w-[${size * AR}px]`,
}), [size, AR])

export const usePrefetchImages = (images: (string | ImageSourcePropType)[]) => {
	useEffect(() => {
		images.forEach((img) => {
			const uri =
				typeof img === "string"
					? img
					: Image.resolveAssetSource(img)?.uri

			if (uri) {
				Image.prefetch(uri)
					.catch((e) => console.log('Image prefetch error:', e))
			}
		})
	}, [images])
}
