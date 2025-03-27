'use client';

import { useState } from 'react';
import { Topbar } from '~/app/components/Dashboard/Topbar';
import { COURSES, ICourse } from '~/app/lib/constants/courses';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseTopCard } from '~/app/components/CourseTopCard';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import { UnifiedCourseCard } from '../CourseCard/UnifiedCourseCard';

export default function Dashboard({ session }: { session: Session }) {
  const lastUpdate = new Date(
    Math.min(
      ...COURSES.filter((x) => !x.soon).map((course) =>
        new Date(course.info!.updatedAt).getTime()
      )
    )
  ).toLocaleDateString('ru-RU');

  const [dashboardSection, setDashboardSection] = useState<
    'courses' | 'history'
  >('courses');

  const cousesList =
    dashboardSection === 'courses'
      ? COURSES.slice(1)
      : COURSES.filter((x) => !x.soon);

  return (
    <main className="border-accent border-0 sm:border-r sm:border-l">
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
          <div className="hidden sm:block">
            {COURSES?.[0] ? (
              <CourseTopCard course={COURSES[0]} />
            ) : (
              <Skeleton className="h-88.5 w-full" />
            )}
          </div>
        )}
        <section className="divide [&>*]:border-accent divide-accent border-accent grid grid-cols-1 gap-y-0 divide-x-1 sm:grid-cols-2 sm:gap-y-9 lg:grid-cols-3 [&>*]:border-t sm:[&>*]:border-y">
          {dashboardSection === 'courses'
            ? cousesList.map((course) => (
                <UnifiedCourseCard
                  key={course.id}
                  course={course}
                  variant="default"
                />
              ))
            : cousesList.map((course) => (
                <UnifiedCourseCard
                  key={course.id}
                  course={course}
                  variant="history"
                  percent={57}
                  courseStudyingFor={'1д 12ч 48м'}
                />
              ))}
          {Array.from({
            length: 3 - (cousesList.length % 3),
          }).map((_, index) => (
            <div key={index}></div>
          ))}
        </section>
      </div>

      <Footer />
    </main>
  );
}
