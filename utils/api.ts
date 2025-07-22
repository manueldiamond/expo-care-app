// Centralized API endpoints

//update with net-url
export const BASE_BACKEND_URL = 'http://10.163.79.170:12345/api'
//'http://172.16.18.210:12345/api'; 

export const API_ENDPOINTS = {
  LOGIN: `/login`,
  REGISTER: `/register`,
  USER_PROFILE: `/profile`,
  USER_PROFILE_PHOTO: `/profile/photo`,
  PROVIDER_AUTH: (provider: string) => `/auth/${provider}`,
  REFRESH: `/refresh`,
  // Add more endpoints as needed
};

export default API_ENDPOINTS; 