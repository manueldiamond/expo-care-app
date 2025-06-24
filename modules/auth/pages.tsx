import { default as AuthLayout } from "@/components/general-layout"
import Button from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { ConsoleLog } from "@/utils/dev"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "expo-router"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { View } from "react-native"
import AuthHeader from "./components/auth-header"
import { AuthInputs } from "./components/auth-inputs"
import AuthProviders from "./components/auth-providers"
import { signInInputs, signInSchema, signUpInputs, signUpSchema } from "./data"

export const LoginScreen = () => {
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(signInSchema),
	})
	const onLogin = (data: any) => {
		ConsoleLog('LOGIN DATA')(data)
	}

	return (
		<AuthLayout>
			<View style={tw`flex-1 gap-9 centered container`}>
				<AuthHeader
					heading="Welcome Back"
					subheading="Your trusted partner in holistic, patient-centered palliative care."
				/>
				<AuthInputs inputs={signInInputs} control={control} errors={errors} />
				<AuthProviders onPressProvider={ConsoleLog('PROVIDER LOGIN')} />
				<View style={tw`mb-[] min-w-full flex flex-col`}> {

				}</View>
				<View style={tw`mb-[] min-w-full flex flex-col`}>
					<Button
						text={"Login"}
						onPress={handleSubmit(onLogin)}
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
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(signUpSchema),
	})
	const onRegister = (data: any) => {
		ConsoleLog('REGISTER DATA')(data)
	}

	return (
		<AuthLayout>
			<View style={tw`flex-1 gap-9 centered container`}>
				<AuthHeader
					heading="Welcome Back"
					subheading="Your trusted partner in holistic, patient-centered palliative care."
				/>
				<AuthInputs inputs={signUpInputs} control={control} errors={errors} />
				<AuthProviders onPressProvider={ConsoleLog('PROVIDER LOGIN')} />
				<View style={tw`mb-[] min-w-full flex flex-col`}>{
				}</View>
				<View style={tw`mb-[] min-w-full flex flex-col`}>
					<Button
						text={"Register"}
						onPress={handleSubmit(onRegister)}
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
			{showingForgotpassword && 
			<BottomSheet heading={"Forgot Password"}>
				<AuthInput
					type={"text"}
					value={email}
					onChange={setEmail}
				//isValid={isValidEmail}
				/>
			</BottomSheet >}
		</>
	)
}

