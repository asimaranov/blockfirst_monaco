'use client';

import { useState } from 'react';
import { Topbar } from '~/app/components/Dashboard/Topbar';
import { COURSES, ICourse } from '~/app/lib/constants/courses';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseTopCard } from '~/app/components/CourseTopCard';
import { CourseCard } from '~/app/components/CourseCard/CourseCard';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
export default function Dashboard({ session }: { session: Session }) {
  const lastUpdate = new Date(
    Math.min(
      ...COURSES
        .filter((x) => !x.soon)
        .map((course) => new Date(course.info!.updatedAt).getTime())
    )
  ).toLocaleDateString('ru-RU');

  const [dashboardSection, setDashboardSection] = useState<
    'courses' | 'history'
  >('courses');

  return (
    <main className="border-accent border-r border-l">
      <Topbar
        lastestUpdate={lastUpdate}
        items={[
          {
            label: 'Курсы',
            onClick: () => setDashboardSection('courses'),
            active: dashboardSection === 'courses',
          },
          {
            label: 'История',
            onClick: () => setDashboardSection('history'),
            active: dashboardSection === 'history',
          },
        ]}
      />
      <div className="grid grid-cols-1 gap-8">
        {dashboardSection === 'courses' && (
          <>
            {COURSES?.[0] ? (
              <CourseTopCard course={COURSES[0]} />
            ) : (
              <Skeleton className="h-[354px] w-full" />
            )}
            <section className="divide [&>*]:border-accent divide-accent border-accent mb-[37px] grid grid-cols-1 gap-y-9 divide-x-1 sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-y">
              {COURSES.slice(1).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {Array.from({ length: 3 - ((COURSES.length - 1) % 3) }).map(
                (_, index) => (
                  <div key={index}></div>
                )
              )}
            </section>
          </>
        )}
        {dashboardSection === 'history' && (
          <section className="divide [&>*]:border-accent divide-accent border-accent mb-[37px] grid grid-cols-1 gap-y-9 divide-x-1 sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-y">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            {Array.from({ length: 3 - (COURSES.length % 3) }).map(
              (_, index) => (
                <div key={index}></div>
              )
            )}
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
