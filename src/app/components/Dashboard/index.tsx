'use client';

import { useState } from 'react';
import { Topbar } from '~/app/components/Dashboard/Topbar';
import { COURSES, ICourse } from '~/app/lib/constants/courses';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseTopCard } from '~/app/components/CourseTopCard';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import { UnifiedCourseCard } from '../CourseCard/UnifiedCourseCard';
import { cn } from '~/helpers';

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
      <div className="grid grid-cols-1 gap-0 sm:gap-8">
        {dashboardSection === 'courses' && (
          <div className="hidden sm:block">
            {COURSES?.[0] ? (
              <CourseTopCard course={COURSES[0]} />
            ) : (
              <Skeleton className="h-88.5 w-full" />
            )}
          </div>
        )}
        {dashboardSection === 'courses' && (
          <div className="block sm:hidden">
            <UnifiedCourseCard
              key={COURSES[0]!.id}
              course={COURSES[0]!}
              variant="default"
              showProgress={true}
              className="not-first:border-t sm:border-y"
            />
            <div className="border-accent flex flex-row gap-3 border-t p-5 pt-10 text-base">
              <div>Другие курсы</div>
              <div className="bg-foreground text-background flex h-5 w-7.5 items-center justify-center rounded-[100px] text-sm font-medium text-center">
                <span className="leading-4 mt-[1px]">8</span>
              </div>
            </div>
          </div>
        )}
        <section className="divide [&>*]:border-accent divide-accent border-accent grid grid-cols-1 gap-y-0 divide-x-0 sm:grid-cols-3 sm:gap-y-9 sm:divide-x-1">
          {dashboardSection === 'courses'
            ? cousesList.map((course, index) => (
                <UnifiedCourseCard
                  key={course.id}
                  course={course}
                  variant="default"
                  showProgress={false}
                  className={cn('sm:border-y', index !== 0 && 'border-t')}
                />
              ))
            : cousesList.map((course, index) => (
                <UnifiedCourseCard
                  key={course.id}
                  course={course}
                  variant="history"
                  className={cn('sm:border-y', index !== 0 && 'border-t')}
                  percent={57}
                  courseStudyingFor={'1д 12ч 48м'}
                />
              ))}
          {Array.from({
            length: 3 - (cousesList.length % 3),
          }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'sm:border-y',
                index !== 0 && 'border-t',
                'nth-[3n]:border-r-0'
              )}
            ></div>
          ))}
        </section>
      </div>

      <Footer />
    </main>
  );
}
