import tw from "@/lib/tailwind";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";





const isValidEmail = (val: string) => val.includes('@')

const authInputStyle = `bg-transparent border border-[#67729429] centered`
export const AuthInput = ({
	name,
	type,
	placeholder,
	value,
	onChange,
	error,
}: {
	name: string;
	type: string;
	placeholder?: string;
	value: string;
	onChange: (val: string) => void;
	error?: string;
}) => {
	const isPasswordInput = type === 'password'
	const [passwordHidden, setPasswordHidden] = useState(true)

	return (
		<View style={tw`${authInputStyle}`}>
			<TextInput
				placeholder={placeholder}
				value={value}
				onChangeText={onChange}
				textContentType={type as any}
				style={tw`text-soft bg-transparent flex-1`}
				secureTextEntry={isPasswordInput && passwordHidden}
			/>
			{isPasswordInput &&
				<TouchableOpacity onPress={() => setPasswordHidden(hidden => !hidden)}>
					<FontAwesome name={passwordHidden ? "eye-slash" : "eye"} size={15} color={tw.color('soft')} />
				</TouchableOpacity>}
			{error && <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text>}
		</View>
	)
}


export function AuthInputs({ inputs, control, errors }: {
	inputs: any[];
	control: Control<any>;
	errors: FieldErrors<any>;
}) {
	return (
		<View style={tw`gap-[18px`}>
			{inputs.map(input => (
				<Controller
					key={input.name}
					control={control}
					name={input.name}
					render={({ field: { onChange, value } }) => (
						<AuthInput
							name={input.name}
							type={input.type}
							placeholder={input.placeholder}
							value={value}
							onChange={onChange}
							error={errors[input.name]?.message as string}
						/>
					)}
				/>
			))}
		</View>
	)
}
