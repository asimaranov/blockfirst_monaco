'use client';

import { useState } from 'react';
import { Topbar } from '~/app/components/Dashboard/Topbar';
import { ICourse } from '~/app/lib/types/ICourse';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseTopCard } from '~/app/components/CourseTopCard';
import { CourseCard } from '~/app/components/CourseCard/CourseCard';
import { Session } from '~/server/auth';

export default function Dashboard({ session }: { session: Session }) {
  const courses: ICourse[] = [
    {
      id: 'solidity-defi',
      title: 'Путешествие по Solidity & DeFi',
      description:
        'Помогите Алексу создать свой собственный токен, продать его инвесторам, внедрить стейкинг, наделение правами, мультисигму...',
      coverImg: '/courses/solidity-defi.svg',
      rating: 4.5,
      alumniCount: 1265,
      lessonsCount: 10,
      timeToComplete: 864000000,
      author: { name: 'Автор 1', image: '#' },
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'some-course',
      title: 'Курс 2',
      description: 'Описание курса 2',
      coverImg: '#',
      rating: 2,
      alumniCount: 123,
      lessonsCount: 1,
      timeToComplete: 864000000,
      author: { name: 'Автор 2', image: '#' },
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ];

  const lastUpdate = new Date(
    Math.min(...courses.map((course) => new Date(course.updatedAt).getTime()))
  ).toLocaleDateString('ru-RU');

  const [dashboardSection, setDashboardSection] = useState<
    'courses' | 'history'
  >('courses');

  return (
    <main className="border-l border-r border-[#282D33]">
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
      {dashboardSection === 'courses' && (
        <>
          {courses?.[0] ? (
            <CourseTopCard course={courses[0]} />
          ) : (
            <Skeleton className="h-[354px] w-full" />
          )}
          <section className="mt-[37px] grid grid-cols-3 divide-x divide-y divide-[#282D33]">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </section>
        </>
      )}
      {dashboardSection === 'history' && (
          <section className="mt-[37px] grid grid-cols-3 divide-x divide-y divide-[#282D33]">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </section>
      )}
    </main>
  );
}
