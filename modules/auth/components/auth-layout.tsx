import BlurredCircles from "@/components/blurred-circles"
import tw from "@/lib/tailwind"
import { ReactChildren } from "@/types"
import { KeyboardAvoidingView, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

const AuthLayout = ({ children }: ReactChildren) => (
	<View style={tw`flex-1`}>
		<KeyboardAvoidingView
			behavior="padding"
			style={tw`flex-1`}
	>
		 <BlurredCircles />
			<ScrollView
				style={tw`flex-1`}
				contentContainerStyle={tw`flex- flex-grow gap-9 centered container`}
			>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	</View>
)

export default AuthLayout 