
import LessonSidebarHeader from './SidebarHeader';
import { Suspense } from 'react';
import { CourseSections } from './CourseSections';

export default async function LessonSidebar() {
  return (
    <>
      <section className="relative z-10 hidden h-screen w-full max-w-86 flex-col sm:flex overflow-y-scroll bg-background">
        <nav className="">
          <LessonSidebarHeader />
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center">
                Loading...
              </div>
            }
          >
            <CourseSections />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
