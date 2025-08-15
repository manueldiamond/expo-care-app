// Centralized API endpoints

//update with net-url
export const BASE_BACKEND_URL = 'http://10.87.20.170:12345/api';

export const API_ENDPOINTS = {
  LOGIN: `/login`,
  REGISTER: `/register`,

  USER_PROFILE: `/profile`,
  CAREGIVER_PROFILE: `/profile/caregiver`,
  PATIENT_PROFILE: `/profile/patient`,

  USER_PROFILE_PHOTO: `/profile/photo`,
  PROVIDER_AUTH: (provider: string) => `/auth/${provider}`, REFRESH: `/refresh`, // Qualifications endpoints
  GET_QUALIFICATIONS: (caregiverId: number) => `/caregivers/qualifications/${caregiverId}`,
  ADD_QUALIFICATION: `/caregivers/qualifications`,
  UPDATE_QUALIFICATION: (qualificationId: number) => `/caregivers/qualifications/${qualificationId}`,
  DELETE_QUALIFICATION: (qualificationId: number) => `/caregivers/qualifications/${qualificationId}`,

  // Verification endpoints
  GET_VERIFICATION: (caregiverId: number) => `/caregivers/verification/${caregiverId}`,
  ADD_VERIFICATION: `/caregivers/verification`,
  UPDATE_VERIFICATION: `/caregivers/verification`,

  // Availability
  UPDATE_AVAILABILITY: `/caregivers/availability`,

  // Caregiver listing endpoints
  LIST_CAREGIVERS: (search?: string, viewing?: 'available' | 'all', limit?: number) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (viewing) params.append('viewing', viewing);
    if (limit) params.append('limit', limit.toString());
    const queryString = params.toString();
    return `/caregivers${queryString ? `?${queryString}` : ''}`;
  },

  // Notifications endpoints
  GET_UNREAD_NOTIFICATIONS: '/notifications',
  GET_ALL_NOTIFICATIONS: '/notifications/all',
  MARK_ALL_READ: '/notifications/read-all',
  MARK_READ: (id: number) => `/notifications/${id}/read`,
  DELETE_NOTIFICATION: (id: number) => `/notifications/${id}`,

  // Caregiver details endpoint
  GET_CAREGIVER: (id: number) => `/caregivers/${id}`,

  // Matches endpoints
  GET_MATCHES: (limit?: number) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    const queryString = params.toString();
    return `/matches${queryString ? `?${queryString}` : ''}`;
  },

  // Chat endpoints
  GET_CHATS: '/chat',
  GET_CHAT_MESSAGES: '/chat',
  CREATE_CHAT: '/chat',
  SEARCH_CHATS: '/chat/search',
  MARK_CHAT_READ: '/chat',
  GET_UNREAD_COUNT: '/chat/unread-count',
  TOGGLE_CHAT_PIN: '/chat',
  ARCHIVE_CHAT: '/chat',
  DELETE_CHAT: '/chat',
  GET_USER: '/users',

  // Add more endpoints as needed
};

export default API_ENDPOINTS;
