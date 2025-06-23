import Button from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { useState } from "react"
import { View } from "react-native"
import { signInInputs, signUpInputs } from "./data"
import AuthHeader from "./components/auth-header"
import AuthProviders from "./components/auth-providers"
import { ConsoleLog } from "@/utils/dev"
import { Link } from "expo-router"
import { AuthInput, AuthInputs } from "./components/auth-inputs"
import { default as AuthLayout } from "@/components/general-layout"
import BottomSheet from "@/components/ui/bottom-sheet"

export const LoginScreen = () => {
	const [values, setValues] = useState()
	const onLogin = () => {

	}

	return (
		<AuthLayout>
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
		</AuthLayout>
	)
}

export const RegisterScreen = () => {
	const [values, setValues] = useState()
	const onLogin = () => {

	}

	return (
		<AuthLayout>
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
		</AuthLayout>
	)
}

const ForgotPassword = () => {
	const [showingForgotpassword, setShowingForgotPassword] = useState(false)
	const [email, setEmail] = useState("")
	return (
		<>
			<Button
				ghost
				text='Forgot Password'
				style={tw`text-good`}
				onPress={() => setShowingForgotPassword(true)}
			/>
			{showingForgotpassword && <BottomSheet heading={"Forgot Password"}>
				<AuthInput
					type={"text"}
					value={email}
					onChange={setEmail}
					isValid={isValidEmail}
				/>
			</BottomSheet >}
		</>
	)
}
