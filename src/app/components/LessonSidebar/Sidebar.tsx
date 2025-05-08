'use client';

import LessonSidebarHeader from './SidebarHeader';
import { Suspense } from 'react';
import { CourseSections } from './CourseSections';
import { SidebarProvider } from './SidebarProvider';

export default function LessonSidebar({ lessonId }: { lessonId: string }) {
  return (
    <SidebarProvider>
      <section className="bg-background relative z-10 hidden h-screen w-full max-w-86 flex-col overflow-y-scroll [scrollbar-width:none] sm:flex [&::-webkit-scrollbar]:hidden">
        <nav>
          <LessonSidebarHeader />
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center">
                Loading...
              </div>
            }
          >
            <CourseSections lessonId={lessonId} />
          </Suspense>
        </nav>
      </section>
    </SidebarProvider>
  );
}
