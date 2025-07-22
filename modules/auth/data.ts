import { z } from "zod";

export const providers = [
	{ name: 'Google', image: require('@/assets/images/google.png') },
	{ name: 'Facebook', image: require('@/assets/images/fb.png') },
];

export const signInInputs = [
	{ name: 'email', type: 'email', },
	{ name: 'password', type: 'password', },
]

export const signUpInputs = [
  { name: 'name', label: 'Name', placeholder: 'Enter your fullname', type: 'text' },
  { name: 'email', label: 'Email', placeholder: 'Enter youf email', type: 'email' },
  { name: 'password', label: 'Password', placeholder: 'Enter your password', secureTextEntry: true, type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm your password', secureTextEntry: true, type: 'password' },
];

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm jjyour password'),
  tos: z.literal(true, { errorMap: () => ({ message: 'You must agree to the terms' }) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
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
