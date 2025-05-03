import { create } from 'zustand';

interface ExamStore {
  isOpen: boolean;
  examId: string;
  open: (examId: string) => void;
  close: () => void;
  toggle: () => void;
}

export const useExamStore = create<ExamStore>((set) => ({
  isOpen: false,
  examId: '',
  open: (examId: string) => set({ isOpen: true, examId }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
