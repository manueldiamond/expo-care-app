import Button from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { ReactChildren } from "@/types"
import { ConsoleLog } from "@/utils/dev"
import showToast from "@/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useRouter } from "expo-router"
import React from "react"
import { useForm } from "react-hook-form"
import { Text, View } from "react-native"
import AuthHeader from "../components/auth-header"
import { AuthCheckbox, AuthInputs } from "../components/auth-inputs"
import AuthProviders from "../components/auth-providers"
import { signUpInputs, signUpSchema } from "../data"

const AuthLayout = ({ children }: ReactChildren) => (
	<View style={tw`flex-1`}>
		<View style={tw`flex-1 gap-9 centered container`}>
			{children}
		</View>
	</View>
)

export const RegisterScreen = () => {
	const { control, handleSubmit, subscribe, formState: { errors, isValid, }, } = useForm({
		resolver: zodResolver(signUpSchema),
	})
	const router = useRouter();
	const onRegister = handleSubmit(
		(data) => {
			router.push('/home');
		},
		(error) => {
			const errormsg = (
				error?.root
				|| error?.name
				|| error?.email
				|| error?.password
				|| error?.tos)?.message
				|| "An error occurred during registration";

			console.log('REGISTER ERROR', errormsg);
			showToast.error(errormsg);
		}
	)
	return (
		<AuthLayout>
			<AuthHeader
				heading="Join us to start searching"
				subheading="Your trusted partner in holistic, patient-centered palliative care."
			/>
			<AuthProviders onPressProvider={ConsoleLog('PROVIDER REGISTER')} />
			<View style={tw`w-full`}>
				<AuthInputs inputs={signUpInputs} control={control} errors={errors} />
				<View style={tw`centered w-full flex-row gap-2 mt-4`}>
					<AuthCheckbox
						control={control}
						name={'tos'}
					/>
					<Text style={tw`flex-1 text-xs text-[#677294]`}>
						I agree with the <Link style={tw`font-medium text-[#677294]`} href={'https://family-care-gh.vercel.app/tos-policy'}>Terms of Service & Privacy Policy</Link>
					</Text>
				</View>
			</View>
			<View style={tw`mb-[] gap-4 min-w-full flex flex-col`}>
				<Button
					text={"Register"}
					onPress={onRegister}
				/>
				<Link
					href={'/login'}
					style={tw`text-good mx-auto text-centere text-sm mb-[46px]`}
				>
					Have an account? Log in
				</Link>
			</View>
		</AuthLayout>
	)
} 
