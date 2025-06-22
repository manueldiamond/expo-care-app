import Button from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { useState } from "react"
import { View } from "react-native"
import { signInInputs, signUpInputs } from "./data"
import AuthHeader from "./components/auth-header"
import AuthInputs from "./components/auth-inputs"
import AuthProviders from "./components/auth-providers"
import { ConsoleLog } from "@/utils/dev"
import { Link } from "expo-router"

export const LoginScreen = () => {
	const [values, setValues] = useState()
	const onLogin = () => {

	}

	return (
		<View style={tw`flex-1`}>
			<View style={tw`flex-1 gap-9 centered container`}>
				<AuthHeader
					heading="Welcome Back"
					subheading="Your trusted partner in holistic, patient-centered palliative care."
				/>
				<AuthInputs inputs={signInInputs} values={values} setValues={setValues} />
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

export const RegisterScreen = () => {
	const [values, setValues] = useState()
	const onLogin = () => {

	}

	return (
		<View style={tw`flex-1`}>
			<View style={tw`flex-1 gap-9 centered container`}>
				<AuthHeader
					heading="Welcome Back"
					subheading="Your trusted partner in holistic, patient-centered palliative care."
				/>
				<AuthInputs inputs={signUpInputs} values={values} setValues={setValues} />
				<AuthProviders onPressProvider={ConsoleLog('PROVIDER LOGIN')} />
				<View style={tw`mb-[] min-w-full flex flex-col`}> {

				}</View>
				<View style={tw`mb-[] min-w-full flex flex-col`}>
					<Button
						text={"Login"}
						onPress={onLogin}
					/>
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



const ForgotPassword = () => {
	const [showingForgotpassword, setShowingForgotPassword] = useState(false)
	return (
		<>
			<Button
				ghost
				text='Forgot Password'
				style={tw`text-good`}
				onPress={() => setShowingForgotPassword(true)}
			/>
			{showingForgotpassword && <BottomSheet>

			</BottomSheet>}
		</>
	)
}
