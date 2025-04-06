import { create } from 'zustand';

interface NotificationsModalStore {
  isOpen: boolean;
  type: 'desktop' | 'mobile' | undefined; 
  open: () => void;
  close: () => void;
  toggle: (type: 'desktop' | 'mobile') => void;
}

export const useNotificationsModalStore = create<NotificationsModalStore>(
  (set) => ({
    isOpen: false,
    type: undefined,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: (type: 'desktop' | 'mobile') => set((state) => ({ isOpen: !state.isOpen, type })),
  })
);
