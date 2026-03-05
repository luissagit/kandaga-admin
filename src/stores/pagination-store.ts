import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pagination } from '@/types';

interface PaginationState {
  modulePagination: Record<string, Pagination>;
  setModulePagination: (moduleKey: string, pagination: Pagination) => void;
}

export const usePaginationStore = create<PaginationState>()(
  persist(
    (set) => ({
      modulePagination: {},
      setModulePagination: (moduleKey, pagination) =>
        set((state) => ({
          modulePagination: {
            ...state.modulePagination,
            [moduleKey]: pagination,
          },
        })),
    }),
    {
      name: 'pagination-storage',
    },
  ),
);
