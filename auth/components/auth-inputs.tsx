import { providers, signInInputs } from "@/data/auth";
import tw from "@/lib/tailwind";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Button from "@/components/ui/button";
import { useState } from "react";
import { FontAwesome } from '@expo/vector-icons'

const AuthInputs = ({ inputs }) => {
	const [values, setValues] = useState({})
	return (
		<View style={tw`gap-[18px`}>
			{inputs.map(input =>
				<AuthInput
					{...input}
					value={values[input.name]}
					onChange={val => setValues(prev => ({
						...prev,
						[input.name]: val,
					}))}
					isValid={input.isValid?.(values[input.name])}
				/>)}
		</View>)
}

const AuthHeader = ({
	heading = '',
	subheading = 'Your trusted partner in holistic, patient- centered palliative care.'
}) => (
	<View className="my-10 centered">
		<Text style={tw`text-2xl`}>
			{heading}</Text>
		<Text style={tw`w-[206px]`}>
			{subheading}
		</Text>
	</View>
)

const AuthProviders = ({ onPressProvider }) => (
	<View style={tw`flex-row gap-4`}>
		{providers.map(provider => (
			<TouchableOpacity onPress={() => onPressProvider(provider.name)} style={tw`px-10 py-[18px] bg-white flex-row centered gap-3 border border-border rounded-lg `}>
				<Image style={tw`w-[18px] h-[18px]`}
					source={{ uri: provider.image, }}
					resizeMode="contain"
				/>
				<Text style={tw`text-base font-light`}>{provider.name}</Text>
			</TouchableOpacity>))}
	</View>
)

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
		</>
	)
}

const isValidEmail = (val: string) => val.includes('@')

const authInputStyle = `bg-transparent border border-[#67729429] centered`
const AuthInput = ({ value, type, isValid, ...props }: Partial<{
	type: any;
	isValid: boolean;
	placeholder: string;
	onChange: (text: string) => void;
	value: string;
}>) => {
	const isPasswordInput = type === 'password'
	const [passwordHidden, setPasswordHidden] = useState(true)
	if (type === 'email' && isValid === undefined)
		isValid = isValidEmail(value ?? '')

	return (
		<View style={tw`${authInputStyle}`}>
			<TextInput
				placeholder={props.placeholder}
				//placeholderTextColor={}
				value={value}
				onChangeText={props.onChange}
				textContentType={type}
				style={tw`text-soft bg-transparent flex-1`}
				secureTextEntry={isPasswordInput && passwordHidden}
			/>
			{isPasswordInput &&
				<TouchableOpacity onPress={() => setPasswordHidden(hidden => !hidden)}>
					<FontAwesome name={isValid ? "eye" : "eye-slash"} size={15} color={tw.color('soft')} />
				</TouchableOpacity>}
			{(isValid !== undefined && value) &&
				<FontAwesome name={isValid ? "check" : "xing"} size={15} color={tw.color('soft')} />}
		</View>
	)
}



