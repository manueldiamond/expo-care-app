import BottomSheet from "@/components/bottom-sheet"
import tw from "@/lib/tailwind"
import { ConsoleLog } from "@/utils/dev"
import { showToast } from "@/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Text, TouchableOpacity, View } from "react-native"
import { z } from "zod"
import { AuthInput } from "../components/auth-inputs"
import AuthOTP from "../components/auth-otp"
import ForgotPasswordLayout from "../components/forgot-password-layout"
import { forgotPasswordSchema, resetPasswordSchema } from "../data"

type ForgotPasswordStage = 'email' | 'otp' | 'reset'

const ForgotPassword = () => {
	const [currentStage, setCurrentStage] = useState<ForgotPasswordStage>('email')
	const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

	// Email stage form
	const emailForm = useForm({
		resolver: zodResolver(forgotPasswordSchema),
	})

	// OTP stage form
	const otpForm = useForm({
		resolver: zodResolver(z.object({ otp: z.string().length(4, "Please enter 4 digits") })),
	})

	// Reset password stage form
	const resetForm = useForm({
		resolver: zodResolver(resetPasswordSchema),
	})

	// Snap points for different stages
	const snapPoints = useMemo(() => {
		switch (currentStage) {
			case 'reset':
				return [75]
			default:
				return [50]
		}
	}, [currentStage])

	const handleEmailSubmit = (data: any) => {
		ConsoleLog('EMAIL SUBMITTED')(data)
		try {
			// Here you would typically send the email
			// Simulate API call
			showToast.success('Email Sent', 'Verification code sent to your email')
			setCurrentStage('otp')
		} catch (error) {
			showToast.error('Error', 'Failed to send email. Please try again.')
		}
	}

	const handleOtpSubmit = (data: any) => {
		ConsoleLog('OTP SUBMITTED')(data)
		try {
			// Here you would typically verify the OTP
			// Simulate API call
			showToast.success('Code Verified', 'Please set your new password')
			setCurrentStage('reset')
		} catch (error) {
			showToast.error('Error', 'Invalid code. Please try again.')
		}
	}

	const handleResetSubmit = (data: any) => {
		ConsoleLog('PASSWORD RESET')(data)
		try {
			// Here you would typically update the password
			// Simulate API call
			showToast.success('Password Updated', 'Your password has been successfully reset')
			sheetRef.current?.dismiss()
			setCurrentStage('email')
			// Reset all forms
			emailForm.reset()
			otpForm.reset()
			resetForm.reset()
		} catch (error) {
			showToast.error('Error', 'Failed to update password. Please try again.')
		}
	}

	const handleClose = useCallback(() => {
		//sheetRef.current?.dismiss()
		setBottomSheetVisible(false)
		setCurrentStage('email')
		// Reset all forms
		emailForm.reset()
		otpForm.reset()
		resetForm.reset()
	}, [emailForm, otpForm, resetForm])

	const renderStageContent = () => {
		switch (currentStage) {
			case 'email':
				return (
					<ForgotPasswordLayout
						heading="Forgot password"
						subheading="Enter your email for the verification process, we will send 4 digits code to your email."
						body={
							<AuthInput
								name="email"
								type="email"
								placeholder="Please enter your email"
								control={emailForm.control}
								error={emailForm.formState.errors.email?.message}
							/>
						}
						buttonText="Continue"
						onButtonClick={emailForm.handleSubmit(handleEmailSubmit)}
					/>
				)
			case 'otp':
				return (
					<ForgotPasswordLayout
						heading="Enter 4 Digits Code"
						subheading="Enter the 4 digits code that you received on your email."
						body={
							<AuthOTP
								name="otp"
								control={otpForm.control}
								digits={4}
								size={54.5}
							/>
						}
						buttonText="Continue"
						onButtonClick={otpForm.handleSubmit(handleOtpSubmit)}
					/>
				)
			case 'reset':
				return (
					<ForgotPasswordLayout
						heading="Reset Password"
						subheading="Set the new password for your account so you can login and access all the features."
						body={
							<View style={tw`gap-4`}>
								<AuthInput
									name="newPassword"
									type="password"
									placeholder="New Password"
									control={resetForm.control}
									error={resetForm.formState.errors.newPassword?.message}
								/>
								<AuthInput
									name="confirmPassword"
									type="password"
									placeholder="Confirm Password"
									control={resetForm.control}
									error={resetForm.formState.errors.confirmPassword?.message}
								/>
							</View>
						}
						buttonText="Update Password"
						onButtonClick={resetForm.handleSubmit(handleResetSubmit)}
					/>
				)
		}
	}

	const sheetRef = useRef<BottomSheetModal>(null);

	const handleOpen = () => {
		sheetRef.current?.present();
		setBottomSheetVisible(true);
	}

	return (
		<>
			<TouchableOpacity onPress={handleOpen}>
				<Text style={tw`text-good text-sm+ text-center mt-[19px]`}>Forgot Password</Text>
			</TouchableOpacity>
			<BottomSheet
				visible={bottomSheetVisible}
				onClose={handleClose}
			>
				{renderStageContent()}
			</BottomSheet>
			{/* 
			<BottomSheetModal
				ref={sheetRef}
				snapPoints={snapPoints}
				onChange={ConsoleLog("BOTTOMSHEETCHANGE")}
				enablePanDownToClose
				onDismiss={handleClose}
				backgroundStyle={tw`rounded-[30px]`}
        keyboardBehavior='extend'
   backdropComponent={props=>(
<BottomSheetBackdrop {...props} opacity={0.4} appearsOnIndex={0} disappearsOnIndex={-1}/>
   )}
			>
				<BottomSheetView style={tw`flex-1`}>
					{renderStageContent()}
				</BottomSheetView>
			</BottomSheetModal>
 */}
		</>
	)
}

export default ForgotPassword 
