import { User } from '@/stores/user-store';

export const isProfileComplete = (user: User | null): boolean => {
  if (!user) return false;
  
  // Check required User fields
  const requiredUserFields = [
    'id',
    'email', 
    'fullname',
    'role',
    'createdAt',
    'updatedAt'
  ];
  
  for (const field of requiredUserFields) {
    const value = (user as any)[field];
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      return false;
    }
  }
  
  // If role is caregiver, check caregiver fields
  if (user.role === 'caregiver') {
    if (!user.caregiver) return false;
    // You can add more checks for caregiver fields here if needed
    // For example, if you want to require a license number:
    // if (!user.caregiver.licenseNumber) return false;
  }
  
  // If role is patient, you could check patient fields similarly if needed
  return true;
};

export const isVerified = (user: User | null): boolean => {
    return user?.caregiver?.isVerified;
}; 