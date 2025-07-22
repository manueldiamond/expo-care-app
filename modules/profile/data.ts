import { z } from 'zod';

export const placeholderProfileImage = require('@/assets/images/avatar.jpg');

export const profileInputs = [
  { name: 'name', label: 'Name', placeholder: 'Enter your name' },
  { name: 'contactNumber', label: 'Contact Number', placeholder: 'Enter your contact number' },
  { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'YYYY-MM-DD' },
  { name: 'location', label: 'Location', placeholder: 'Enter your location' },
];

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contactNumber: z.string({ required_error: 'Contact number is required' }),
  dateOfBirth: z.date({ invalid_type_error: 'Invalid date' }).optional(),
  location: z.string({ required_error: 'Location is required' }),
});

//
