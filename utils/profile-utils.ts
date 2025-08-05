import { CaregiverProfile, Patient, User } from "@/types";

/**
 * Generic function to check if object fields are not falsy
 * @param obj - The object to check
 * @param fields - Array of field keys to check (strictly typed)
 * @returns boolean indicating if all fields are truthy
 */
export const checkObjectFields = <T extends Record<string, any>>(
  obj: T | null | undefined,
  fields: (keyof T)[]
): boolean => {
  if (!obj) return false;
  
  for (const field of fields) {
    const value = obj[field];
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      return false;
    }
  }
  
  return true;
};

export const isProfileComplete = (user: User | null): boolean => {
  if (!user) return false;
  
  // Check required User fields
  if(!checkObjectFields<User>(user,[
    'fullname',
    'dateOfBirth',
    'contact',
    'photoUrl',
  ])) return false;
  
  // If role is caregiver, check caregiver fields
  if (user.role === 'caregiver') {
    if ( !checkObjectFields<CaregiverProfile>(user.caregiver, [
        'type',
        'schedule',
      ])

    ) return false;
      }
  
  // If role is patient, check patient fields
  if (user.role === 'patient') {
    if ( !checkObjectFields<Patient>(user.patient, [
        'condition',
        'years',
        'schedule'
      ])
    ) return false;
  }
  
  return true;
}; 