export const providers = [
	{ name: 'Google', image: '@/assets/images/google.png' },
	{ name: 'Facebook', image: '@/assets/images/fb.png' },
];

export const signInInputs = [
	{ name: 'email', type: 'email', },
	{
		name: 'password', type: 'password',
		isValid: val => val?.length > 6
	},
]
