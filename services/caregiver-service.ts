import API_ENDPOINTS from '@/utils/api';
import api from '@/utils/axios';

// Qualifications
export async function getQualifications(caregiverId: number) {
  const res = await api.get(API_ENDPOINTS.GET_QUALIFICATIONS(caregiverId));
  return res.data;
}

export async function addQualification(formData: FormData) {
  const res = await api.postForm(API_ENDPOINTS.ADD_QUALIFICATION, formData);
  return res.data;
}

export async function updateQualification(qualificationId: number, formData: FormData) {
  const res = await api.putForm(API_ENDPOINTS.UPDATE_QUALIFICATION(qualificationId), formData);
  return res.data;
}

export async function deleteQualification(qualificationId: number) {
  const res = await api.delete(API_ENDPOINTS.DELETE_QUALIFICATION(qualificationId));
  return res.data;
}

// Verification
export async function getVerification(caregiverId: number) {
  const res = await api.get(API_ENDPOINTS.GET_VERIFICATION(caregiverId));
  return res.data?.verification || null;
}

export async function addVerification(formData: FormData) {
  console.log('Adding verification with formData:', formData);
  console.log('Sending to endpoint:', API_ENDPOINTS.ADD_VERIFICATION);
  const res = await api.postForm(API_ENDPOINTS.ADD_VERIFICATION, formData);
  console.log('Verification added:', res.data);
  return res.data;
}

export async function updateVerification(formData: FormData) {
  const res = await api.putForm(API_ENDPOINTS.UPDATE_VERIFICATION, formData);
  return res.data;
}

// Availability
export async function updateAvailability(isAvailable: boolean) {
  const res = await api.put(API_ENDPOINTS.UPDATE_AVAILABILITY, { isAvailable });
  return res.data;
} 