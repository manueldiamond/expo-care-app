import { API_ENDPOINTS } from '@/utils/api';
import api from '@/utils/axios';
import { Caregiver } from '../types';

export interface CaregiverSearchParams {
  search?: string;
  viewing?: 'available' | 'all';
  limit?: number;
}

class PatientsService {
  /**
   * Get filtered caregivers from API
   */
  async getCaregivers(params: CaregiverSearchParams = {}): Promise<Caregiver[]> {
    console.log('[PatientsService] getCaregivers called with params:', params);
    try {
      const endpoint = API_ENDPOINTS.LIST_CAREGIVERS(params.search, params.viewing, params.limit);
      console.log('[PatientsService] Constructed endpoint:', endpoint);
      const response = await api.get<Caregiver[]>(endpoint);

      if (response.data) {
        console.log('[PatientsService] Caregivers fetched successfully:', response.data);
        return response.data;
      } else {
        throw new Error( 'Failed to fetch caregivers',response.data);
      }
    } catch (error) {
      console.error('[PatientsService] Error fetching caregivers:', error);
      throw error;
    }
  }

  /**
   * Search caregivers with debounced API call
   */
  async searchCaregivers(query: string, viewing: 'available' | 'all' = 'available'): Promise<Caregiver[]> {
    console.log('[PatientsService] searchCaregivers called with query:', query, 'viewing:', viewing);
    return this.getCaregivers({
      search: query.trim() || undefined,
      viewing
    });
  }

  /**
   * Get available caregivers (default view)
   */
  async getAvailableCaregivers(): Promise<Caregiver[]> {
    console.log('[PatientsService] getAvailableCaregivers called');
    return this.getCaregivers({ viewing: 'available' });
  }

  /**
   * Get limited available caregivers for home page
   */
  async getLimitedAvailableCaregivers(limit: number = 3): Promise<Caregiver[]> {
    console.log('[PatientsService] getLimitedAvailableCaregivers called with limit:', limit);
    return this.getCaregivers({ viewing: 'available', limit });
  }

  /**
   * Get matched caregivers from API with pagination
   */
  async getMatchedCaregivers(limit?: number, offset?: number): Promise<Caregiver[]> {
    // If backend supports offset, use:
    // const endpoint = API_ENDPOINTS.GET_MATCHES(limit, offset);
    // For now, fetch all and slice locally
    const all = await this.getMatchedCaregiversAll();
    if (typeof limit === 'number') {
      return all.slice(offset || 0, (offset || 0) + limit);
    }
    return all;
  }

  /**
   * Simulate fetching all matched caregivers (replace with real API call)
   */
  async getMatchedCaregiversAll(): Promise<Caregiver[]> {
    // TODO: Replace with real API call
    return this.getCaregivers({ viewing: 'available' });
  }
}

export const patientsService = new PatientsService();
export default patientsService; 