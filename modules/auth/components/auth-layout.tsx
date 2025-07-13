import tw from "@/lib/tailwind"
import { ReactChildren } from "@/types"
import { KeyboardAvoidingView, View } from "react-native"

const AuthLayout = ({ children }: ReactChildren) => (
	<View style={tw`flex-1`}>
		<KeyboardAvoidingView
			behavior="padding"
			style={tw`flex-1 gap-9 centered container`}>
			{children}
		</KeyboardAvoidingView>
	</View>
)

export default AuthLayout 
