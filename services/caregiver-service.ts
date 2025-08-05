import API_ENDPOINTS from '@/utils/api';
import api from '@/utils/axios';

// updateCaregiverDetails
export async function updateCaregiverProfile(data: FormData | object) {
  const res = await api.put(API_ENDPOINTS.CAREGIVER_PROFILE, data);
  return res.data;
}

// getQualifications
export async function getQualifications(caregiverId: number) {
  const res = await api.get(API_ENDPOINTS.GET_QUALIFICATIONS(caregiverId));
  return res.data;
}

// addQualification
export async function addQualification(caregiverId: number, formData: FormData) {
  const res = await api.post(API_ENDPOINTS.ADD_QUALIFICATION(caregiverId), formData);
  return res.data;
}

// deleteQualification
export async function deleteQualification(caregiverId: number, qualificationId: number) {
  const res = await api.delete(API_ENDPOINTS.DELETE_QUALIFICATION(caregiverId, qualificationId));
  return res.data;
} 