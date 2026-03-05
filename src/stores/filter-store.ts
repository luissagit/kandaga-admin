import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  moduleFilter: Record<string, any>;
  setModuleFilter: (moduleKey: string, filter: any) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      moduleFilter: {},
      setModuleFilter: (moduleKey, filter) =>
        set((state) => ({
          moduleFilter: {
            ...state.moduleFilter,
            [moduleKey]: filter,
          },
        })),
    }),
    {
      name: 'filter-storage',
    },
  ),
);
