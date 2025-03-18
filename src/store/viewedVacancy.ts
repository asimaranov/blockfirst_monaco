import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ViewedVacancyStore {
  viewedVacancies: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useViewedVacancyStore = create<
  ViewedVacancyStore,
  [['zustand/persist', never]]
>(
  persist(
    (set) => ({
      viewedVacancies: [],
      add: (id) => {
        set((state) => ({
          viewedVacancies: [...state.viewedVacancies, id],
        }));
      },
      remove: (id) => {
        set((state) => ({
          viewedVacancies: state.viewedVacancies.filter((i) => i !== id),
        }));
      },
      clear: () => {
        set(() => ({
          viewedVacancies: [],
        }));
      },
    }),
    {
      name: 'viewedVacancyStore',
    }
  )
);
