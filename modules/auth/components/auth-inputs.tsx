import { providers, signInInputs } from "@/data/auth";
import tw from "@/lib/tailwind";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Button from "@/components/ui/button";
import { useState } from "react";
import { FontAwesome } from '@expo/vector-icons'





const isValidEmail = (val: string) => val.includes('@')

const authInputStyle = `bg-transparent border border-[#67729429] centered`
export const AuthInput = ({ value, type, isValid, ...props }: Partial<{
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


export default function AuthInputs({ inputs, values, setValues }) {
	//const [values, setValues] = useState({})
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
		</View>
	)
}
