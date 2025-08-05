import { z } from 'zod';

export const placeholderProfileImage = require('@/assets/images/avatar.jpg');

export const profileInputs = [
  { name: 'name', label: 'Name', placeholder: 'Enter your name' },
  { name: 'contactNumber', label: 'Contact Number', placeholder: 'Enter your contact number' },
  { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'YYYY-MM-DD' },
  { name: 'location', label: 'Location', placeholder: 'Enter your location' },
];

export const conditions = [
  { label: 'Cancer', value: 'Cancer' },
  { label: 'Stroke', value: 'Stroke' },
  { label: 'Dementia', value: 'Dementia' },
  { label: 'Heart Disease', value: 'Heart Disease' },
  { label: 'Diabetes', value: 'Diabetes' },
  { label: 'Other', value: 'Other' },
];

export const years = [
  { label: 'Less than 1 year', value: '<1' },
  { label: '1-2 years', value: '1-2' },
  { label: '3-5 years', value: '3-5' },
  { label: 'More than 5 years', value: '5+' },
];


export const caregiverTypes = [
  { label: 'Nurse', value: 'nurse' },
  { label: 'Doctor', value: 'doctor' },
  { label: 'Trained Caregiver', value: 'trained caregiver' },
  { label: 'Individual', value: 'individual' }
];

export const educationLevels = [
  { label: 'Primary', value: 'Primary' },
  { label: 'JHS', value: 'JHS' },
  { label: 'SHS', value: 'SHS' },
  { label: 'Tertiary', value: 'Tertiary' }
];

export const workSchedules = [
  { label: 'Full-time (24/7 support)', value: 'Full-time' },
  { label: 'Week-days (Mon - Fri)', value: 'week-days' },
  { label: 'Week-ends (Fri - Sun)', value: 'week-ends' },
  { label: 'Emergency (Immediate response)', value: 'Emergency' },
];


export const schedules = workSchedules

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

export const caregiverDetailsSchema = z.object({
  schedule: z.string().min(1, 'Work schedule is required'),
  type: z.string().min(1, 'Professional type is required'),
  educationLevel: z.string().optional(),
  bio: z.string().optional(),
});

export const schema = z.object({
  condition: z.string().min(1, 'Condition is required'),
  years: z.string().min(1, 'Years with condition is required'),
  schedule: z.string().min(1, 'Care schedule is required'),
  description: z.string().optional(),
  special: z.string().optional(),
}).refine((data) => data.condition !== 'Other' || !!data.description, {
  message: 'Description is required for Other condition',
  path: ['description'],
});

//
