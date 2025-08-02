import tw from "@/lib/tailwind";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import { Control, FieldErrors, useController } from "react-hook-form";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

const authInputStyle = `px-6 h-[54px] flex-row rounded-lg p-flex-row bg-transparent border border-[#67729429] centered`

export const AuthInput = ({
	name,
	type,
	placeholder,
	control,
	error,
	showIsValid = type === 'email'
}: {
	name: string;
	type: string;
	placeholder?: string;
	control: Control<any>;
	error?: string;
	showIsValid?: boolean;
}) => {
	const isPasswordInput = type === 'password'
	const [passwordHidden, setPasswordHidden] = useState(true)

	const {
		field: { onChange, value }
	} = useController({
		name,
		control,
		defaultValue: '',
	});

	return (
		<View style={tw`${authInputStyle}`}>
			<TextInput
				placeholder={placeholder || (name[0].toUpperCase() + name.slice(1))}
				value={value}
				onChangeText={onChange}
				textContentType={type as any}
				style={tw`text-soft bg-transparent flex-1 font-normal`}
				secureTextEntry={isPasswordInput && passwordHidden}
			/>
			{isPasswordInput &&
				<TouchableOpacity style={tw`py-[auto]`} onPress={() => setPasswordHidden(hidden => !hidden)}>
					<FontAwesome name={passwordHidden ? "eye-slash" : "eye"} size={20} color={tw.color('soft')} />
				</TouchableOpacity>}
			{showIsValid && value &&
				<FontAwesome name={error ? "times" : "check"} size={15} color={tw.color(error ? 'red-500' : 'soft')} />
			}
			{/*
			error && <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text>
			*/}
		</View>

	)
}

export function AuthInputs({ inputs, control, errors }: {
	inputs: any[];
	control: Control<any>;
	errors: FieldErrors<any>;
}) {
	return (
		<View style={tw`flex-col gap-[18px] w-full`}>
			{inputs.map(input => (
				<AuthInput
					key={input.name}
					name={input.name}
					type={input.type}
					placeholder={input.placeholder}
					control={control}
					error={errors[input.name]?.message as string}
				/>
			))}
		</View>
	)
}

// AuthCheckbox component with label and RHF control
export const AuthCheckbox = ({ name, control }: { name: string, control: any }) => {
	// Integrate with React Hook Form
	const {
		field: { onChange, value }
	} = useController({
		name,
		control,
		defaultValue: false, // Default unchecked
	});

	//const [pressed, setPressed] = useState(false);
	const size = '20px';

	return (
		<Pressable
			//onPressIn={() => setPressed(true)} 
			//onPressOut={() => setPressed(false)} 
			onPress={() => onChange(!value)}
		>
			<View
				style={tw`w-[${size}] h-[${size}] rounded-full flex items-center justify-center ${value ? 'bg-black/50 text-light' : 'bg-transparent border border-2 border-soft'}`}
			>
				{value && <Text style={tw`text-light text-sm font-normal`}>✓</Text>}
			</View>
		</Pressable>
	);
};

