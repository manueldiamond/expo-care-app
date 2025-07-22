import { User } from '@/types';
import API_ENDPOINTS from '@/utils/api';
import { extractApiError } from '@/utils/api-error';
import api from '@/utils/axios';
import { create } from 'zustand';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  loadProfile: () => Promise<boolean>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: true,
  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  updateUser: (userUpdate) => {
    set((state) => ({ user: state.user ? { ...state.user, ...userUpdate } : null }));
  },
  loadProfile: async () => {
    try {
      const {data:{user}} = await api.get<{user:User}>(API_ENDPOINTS.USER_PROFILE);
      set({ user, isAuthenticated: true });
      console.log('[loadProfile] SET store to user response:', user);

      return true;
    } catch (err) {
      console.error('[loadProfile] Error during profile load:', err&&extractApiError(err,"UNKNOWWWNN ERROR"));
      set({ user: null, isAuthenticated: false });
      return false;
    }
  },
})); 