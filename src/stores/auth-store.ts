import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { encryptData, decryptData } from '@/utils/encription';
import { LOCAL_STORAGE_AUTH } from '@/constants';

interface AuthState {
  auth: any | null;
  setAuth: (data: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (data) =>
        set({
          auth: data,
        }),
      logout: () => set({ auth: null }),
    }),
    {
      name: LOCAL_STORAGE_AUTH,
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const encrypted = localStorage.getItem(name);
          if (!encrypted) return null;
          return decryptData(encrypted);
        },
        setItem: (name, value) => {
          const encrypted = encryptData(value);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      })),
    },
  ),
);
