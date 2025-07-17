import { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStoreState {
  currentUser: User | null;
  setUser: (user: User | null) => void;
  hasHydrated: boolean;
  setHasHydrated: () => void;
}

const store = persist<UserStoreState>(
  (set) => ({
    currentUser: null,
    setUser: (user) => set({ currentUser: user }),
    hasHydrated: false,
    setHasHydrated: () => set({ hasHydrated: true }),
  }),
  {
    name: 'user-storage',
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated();
    },
  }
);

export const useUserStore = create(store);
