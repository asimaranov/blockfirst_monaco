import { create } from 'zustand';

type ResetStoreState = {
  isResetModalOpen: boolean;
  buttonPosition: { top: number; left: number } | null;
  openResetModal: (position: { top: number; left: number }) => void;
  closeResetModal: () => void;
};

export const useResetStore = create<ResetStoreState>((set) => ({
  isResetModalOpen: false,
  buttonPosition: null,

  openResetModal: (position) =>
    set({
      isResetModalOpen: true,
      buttonPosition: position,
    }),

  closeResetModal: () =>
    set({
      isResetModalOpen: false,
      buttonPosition: null,
    }),
}));
