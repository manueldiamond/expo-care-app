import tw from "@/lib/tailwind"
import { useRef, useState } from "react"
import { Control, useController } from "react-hook-form"
import { TextInput, View } from "react-native"

interface AuthOTPProps {
	control: Control<any>
	name: string
	digits?: number
	size?: number
}

const AuthOTP = ({ control, name, digits = 4, size = 54.5 }: AuthOTPProps) => {
	const {
		field: { onChange, value }
	} = useController({
		name,
		control,
		defaultValue: '',
	});

	const inputRefs = useRef<TextInput[]>([])
	const [otp, setOtp] = useState<string[]>(new Array(digits).fill(''))

	const handleOtpChange = (text: string, index: number) => {
		const newOtp = [...otp]
		newOtp[index] = text
		setOtp(newOtp)
		
		// Update the form value
		onChange(newOtp.join(''))
		
		// Auto-focus next input
		if (text && index < digits - 1) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleKeyPress = (e: any, index: number) => {
		// Handle backspace
		if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	return (
		<View style={tw`flex-row gap-2 justify-center`}>
			{Array.from({ length: digits }, (_, index) => (
				<TextInput
					key={index}
					ref={(ref) => {
						if (ref) inputRefs.current[index] = ref
					}}
					style={[
						tw`centered font-bold text-[26px] text-soft bg-transparent border border-[#67729429] rounded-lg`,
						{ width: size, height: size }
					]}
					maxLength={1}
					keyboardType="numeric"
					textAlign="center"
					value={otp[index]}
					onChangeText={(text) => handleOtpChange(text, index)}
					onKeyPress={(e) => handleKeyPress(e, index)}
				/>
			))}
		</View>
	)
}

export default AuthOTP 