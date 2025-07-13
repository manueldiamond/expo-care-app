import Button from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { ConsoleLog } from "@/utils/dev"
import showToast from "@/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useRouter } from "expo-router"
import React from "react"
import { useForm } from "react-hook-form"
import { View } from "react-native"
import AuthHeader from "../components/auth-header"
import { AuthInputs } from "../components/auth-inputs"
import AuthLayout from "../components/auth-layout"
import AuthProviders from "../components/auth-providers"
import { signInInputs, signInSchema } from "../data"
import ForgotPassword from "./forgot-password"

export const LoginScreen = () => {
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(signInSchema),
	})
	const router = useRouter();
	const onLogin = handleSubmit(
		(data) => {
			// On successful login, navigate to caregiver screen
			router.push('/home');
		},
		(error) => {
			const errormsg = (
				error?.root
				|| error?.email
				|| error?.password)?.message
				|| "An error occurred during login";

			console.log('LOGIN ERROR', errormsg);
			showToast.error(errormsg);
		}
	)

	return (
		<AuthLayout>
			<AuthHeader
				heading="Welcome Back"
				subheading="Your trusted partner in holistic, patient-centered palliative care."
			/>
			<AuthProviders onPressProvider={ConsoleLog('PROVIDER LOGIN')} />
			<AuthInputs inputs={signInInputs} control={control} errors={errors} />
			<View style={tw`mb-[] min-w-full flex flex-col`}>
				<Button
					text={"Login"}
					onPress={onLogin}
				/>
				<ForgotPassword />
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
