'use client';

import { ReactNode } from 'react';
import { CourseDataProvider } from './CourseSections';

export function SidebarProvider({ children }: { children: ReactNode }) {
  return <CourseDataProvider>{children}</CourseDataProvider>;
}
