import API_ENDPOINTS from '@/utils/api';
import { extractApiError } from '@/utils/api-error';
import api from '@/utils/axios';

// Update profile info (name, email, etc.)
export const updateProfile = async (profileData: {
  fullname?: string;
  email?: string;
  contact?: string;
  dateOfBirth?: Date;
  location?: string;
}) => {
  try{
  const response = await api.put(API_ENDPOINTS.USER_PROFILE, profileData);
  return response?.data;
  } catch (error: any) {
    const errmsg=extractApiError(error,'Unknown profile update error')
    console.log(errmsg,error?.response)

    throw error;
  }

}

// Update patient profile (medical info)
export const updatePatientProfile = async (patientData: {
  condition?: string;
  years?: string;
  schedule?: string;
  description?: string;
  special?: string;
}) => {
  try {
    const response = await api.put(API_ENDPOINTS.PATIENT_PROFILE, patientData);
    return response?.data;
  } catch (error: any) {
    const errmsg = extractApiError(error, 'Unknown patient profile update error');
    console.log(errmsg, error?.response);
    throw error;
  }
}

// Update caregiver profile
export const updateCaregiverProfile = async (caregiverData: {
  schedule: string;
  type: string;
  educationLevel?: string;
  bio?: string;
}) => {
  try {
    console.log('PUT',caregiverData)
    const response = await api.put(API_ENDPOINTS.CAREGIVER_PROFILE, caregiverData);
    console.log("UPDATED CAREGIVER PROFILE",response.data)
    return response?.data;
  } catch (error: any) {
    const errmsg = extractApiError(error, 'Unknown caregiver profile update error');
    console.log(errmsg, error?.response);
    throw error;
  }
}

// Upload profile photo, returns image URL
export const uploadProfilePhoto = async (imageUri: string) => {
  const formData = new FormData();

  formData.append('photo', {
    uri: imageUri,
    name: 'profile.jpg',
    type: 'image/jpeg',
  } as any);

  let response;
  try {
    response = await api.post(API_ENDPOINTS.USER_PROFILE_PHOTO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error: any) {
    const errmsg=extractApiError(error,'Unknown photo upload error')
    console.log(errmsg)
    throw error;
  }

  console.log("UPLOADED PHOTO")

  return response.data?.photoUrl;
}; 


