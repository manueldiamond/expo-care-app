// Centralized API endpoints

//update with net-url
export const BASE_BACKEND_URL = 'http://10.74.255.170:12345/api'; 

export const API_ENDPOINTS = {
  LOGIN: `/login`,
  REGISTER: `/register`,

  USER_PROFILE:`/profile`,
  CAREGIVER_PROFILE: `/profile/caregiver`,
  PATIENT_PROFILE: `/profile/patient`,

  USER_PROFILE_PHOTO: `/profile/photo`,
  PROVIDER_AUTH: (provider: string) => `/auth/${provider}`,
  REFRESH: `/refresh`,
  
  // Caregiver listing endpoints
  LIST_CAREGIVERS: (search?: string, viewing?: 'available' | 'all', limit?: number) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (viewing) params.append('viewing', viewing);
    if (limit) params.append('limit', limit.toString());
    const queryString = params.toString();
    return `/caregivers${queryString ? `?${queryString}` : ''}`;
  },
  
  // Add more endpoints as needed
};

export default API_ENDPOINTS; 