import { create } from 'zustand';

interface ExamStore {
  isOpen: boolean;
  examId: string;
  totalLives: number;
  totalQuestions: number;
  currentLives: number;
  currentQuestionId: number;
  correctAnswers: number;
  isCompleted: boolean;
  isFailed: boolean;
  open: (examId: string) => void;
  close: () => void;
  toggle: () => void;
  updateLives: (current: number, total: number) => void;
  updateCurrentQuestion: (questionId: number) => void;
  updateTotalQuestions: (totalQuestions: number) => void;
  updateCorrectAnswers: (correctAnswers: number) => void;
  updateCompletionStatus: (isCompleted: boolean, isFailed: boolean) => void;
}

export const useExamStore = create<ExamStore>((set) => ({
  isOpen: false,
  examId: '',
  totalLives: 5,
  currentLives: 5,
  currentQuestionId: 1,
  totalQuestions: 20,
  correctAnswers: 0,
  isCompleted: false,
  isFailed: false,
  open: (examId: string) => set({ isOpen: true, examId }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  updateLives: (current: number, total: number) =>
    set({ currentLives: current, totalLives: total }),
  updateCurrentQuestion: (questionId: number) =>
    set({ currentQuestionId: questionId }),
  updateTotalQuestions: (totalQuestions: number) =>
    set({ totalQuestions: totalQuestions }),
  updateCorrectAnswers: (correctAnswers: number) =>
    set({ correctAnswers: correctAnswers }),
  updateCompletionStatus: (isCompleted: boolean, isFailed: boolean) =>
    set({ isCompleted, isFailed }),
}));
