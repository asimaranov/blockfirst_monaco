'use client';

import LessonSidebarHeader from './SidebarHeader';
import { Suspense, useState } from 'react';
import { CourseSections } from './CourseSections';

export default function LessonSidebar({ lessonId, courseInfo }: { lessonId: string, courseInfo: any }) {
  const [courseProgress, setCourseProgress] = useState<number>(0);
  return (
      <section className="bg-background relative z-10 hidden h-screen w-full max-w-86 flex-col overflow-y-scroll [scrollbar-width:none] sm:flex [&::-webkit-scrollbar]:hidden">
        <nav>
          <LessonSidebarHeader courseProgress={courseProgress} />
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center">
                Loading...
              </div>
            }
          >
            <CourseSections lessonId={lessonId} courseInfo={courseInfo} setCourseProgress={setCourseProgress} />
          </Suspense>
        </nav>
      </section>
  );
}
