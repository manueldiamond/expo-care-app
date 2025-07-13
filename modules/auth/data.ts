import { z } from "zod";

export const providers = [
	{ name: 'Google', image: require('@/assets/images/google.png') },
	{ name: 'Facebook', image: require('@/assets/images/fb.png') },
];

export const signInInputs = [
	{ name: 'email', type: 'email', },
	{
		name: 'password', type: 'password',
		isValid: (val: any) => val?.length > 6
	},
]

export const signUpInputs = [
	{ name: 'name', type: 'fullname', },
	{ name: 'email', type: 'email', },
	{ name: 'password', type: 'password', },
]

export const signInSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(7, "Password must be at least 7 characters"),
})

export const signUpSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(7, "Password must be at least 7 characters"),
	tos: z.boolean().refine((val) => val, {
		message: "You must agree to the Terms of Service",
	}),
})

export const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
})

export const resetPasswordSchema = z.object({
	newPassword: z.string().min(7, "Password must be at least 7 characters"),
	confirmPassword: z.string().min(7, "Password must be at least 7 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})
