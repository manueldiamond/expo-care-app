import { z } from 'zod';

export const placeholderProfileImage = require('@/assets/images/avatar.jpg');

export const profileInputs = [
  { name: 'name', label: 'Name', placeholder: 'Enter your name' },
  { name: 'contactNumber', label: 'Contact Number', placeholder: 'Enter your contact number' },
  { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'YYYY-MM-DD' },
  { name: 'location', label: 'Location', placeholder: 'Enter your location' },
];

export const caregiverInputs = [
  { name: 'workSchedule', label: 'Work Schedule', placeholder: 'Select your work schedule', type: 'select' },
  { name: 'specializesIn', label: 'Specializes In', placeholder: 'Select your specialization', type: 'select' },
  { name: 'bio', label: 'Caregiver Bio', placeholder: 'Tell us about your experience', type: 'textarea' },
  { name: 'qualifications', label: 'Qualifications', placeholder: 'List your qualifications', type: 'textarea' },
];

export const workSchedules = [
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Part-time', value: 'Part-time' },
  { label: 'Occasional', value: 'Occasional' },
  { label: 'Emergency', value: 'Emergency' },
  { label: 'Other', value: 'Other' },
];

export const specializations = [
  { label: 'Cancer Care', value: 'Cancer' },
  { label: 'Stroke Recovery', value: 'Stroke' },
  { label: 'Dementia Care', value: 'Dementia' },
  { label: 'Heart Disease', value: 'Heart Disease' },
  { label: 'Diabetes Management', value: 'Diabetes' },
  { label: 'General Care', value: 'General' },
  { label: 'Other', value: 'Other' },
];

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contactNumber: z.string({ required_error: 'Contact number is required' }),
  dateOfBirth: z.date({ invalid_type_error: 'Invalid date' }).optional(),
  location: z.string({ required_error: 'Location is required' }),
});

export const caregiverSchema = z.object({
  workSchedule: z.string().min(1, 'Work schedule is required'),
  specializesIn: z.string().min(1, 'Specialization is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  qualifications: z.string().min(1, 'Qualifications are required'),
});

//
