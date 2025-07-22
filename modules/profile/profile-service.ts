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
  } catch (error) {
    const errmsg=extractApiError(error,'Unknown profile update error')
    console.log(errmsg,error?.response)

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
  } catch (error) {
    const errmsg=extractApiError(error,'Unknown photo upload error')
    console.log(errmsg)
    throw error;
  }

  console.log("UPLOADED PHOTO")

  return response.data?.photoUrl;
}; 