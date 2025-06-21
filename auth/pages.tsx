import { signInInputs } from "@/data/auth"
import tw from "@/lib/tailwind"
import { View } from "react-native"

export const LoginScreen = () => {
	const onLogin = () => {

	}

	return (
		<View style={tw`flex-1`}>
			<View style={tw`flex-1 gap-9 centered container`}>
				<AuthHeader
					heading="Welcome Back"
					subheading="Your trusted partner in holistic, patient-centered palliative care."
				/>
				<AuthInputs inputs={signInInputs} />
				<AuthProviders onPressProvider={ConsoleLog('PROVIDER LOGIN')} />
				<View style={tw`mb-[] min-w-full flex flex-col`}> {

				}</View>
				<View style={tw`mb-[] min-w-full flex flex-col`}>
					<Button
						text={"Login"}
						onPress={onLogin}
					/>
					<ForgotPassword />
				</View>
			</View>

			<Link
				href={'/register'}
				style={tw`text-good text-sm mb-[46px]`}
			>
				Don't have an account? Join us
			</Link>
		</View >
	)
}
