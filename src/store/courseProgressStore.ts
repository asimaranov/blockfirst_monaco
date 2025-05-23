import { create } from 'zustand';

type CourseProgressStoreState = {
  courseProgress: number;
  setCourseProgress: (progress: number) => void;
};

export const useCourseProgressStore = create<CourseProgressStoreState>((set) => ({
  courseProgress: 0,
  setCourseProgress: (progress: number) => set({ courseProgress: progress }),
}));
