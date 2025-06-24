import { z } from "zod";

export const providers = [
	{ name: 'Google', image: '@/assets/images/google.png' },
	{ name: 'Facebook', image: '@/assets/images/fb.png' },
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
	{
		name: 'password', type: 'password',
		isValid: (val: any) => val?.length > 6
	},
]

export const signInSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(7, "Password must be at least 7 characters"),
})

export const signUpSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(7, "Password must be at least 7 characters"),
})
