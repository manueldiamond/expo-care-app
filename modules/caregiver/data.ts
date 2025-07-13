import { z } from 'zod';

export const placeholderProfileImage = require('@/assets/images/avatar.jpg');

export const profileInputs = [
  { name: 'name', label: 'Name', placeholder: 'Enter your name' },
  { name: 'contactNumber', label: 'Contact Number', placeholder: 'Enter your contact number' },
  { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'YYYY-MM-DD' },
  { name: 'location', label: 'Location', placeholder: 'Enter your location' },
];

export const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  contactNumber: z.string().min(7, 'Contact number is required'),
  dateOfBirth: z.string().min(8, 'Date of birth is required'),
  location: z.string().min(2, 'Location is required'),
});
