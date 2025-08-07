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
  loadProfile: () => Promise<User|undefined>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
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
      if(!user) throw new Error("Failed to get user from: "+API_ENDPOINTS.USER_PROFILE)
      set({ user, isAuthenticated: true });
      console.log('[loadProfile] SET store to user response:', user);

      return user;
    } catch (err) {
      console.error('[loadProfile] Error during profile load:', err&&extractApiError(err,"UNKNOWWWNN ERROR"));
      set({ user: null, isAuthenticated: false });
    }
  },
})); 
