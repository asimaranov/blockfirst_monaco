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
      smallImg: '/courses/solidity/small.png',
      bigImg: '/courses/solidity/big.png',
      rating: 4.5,
      alumniCount: 1265,
      lessonsCount: 123,
      duration: 5,
      author: { name: 'Автор 1', image: '#' },
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'uniswap_advanced',
      title: 'Продвинутый Uniswap курс',
      description: 'Реализуйте свой собственный uniswap с нуля и помогите Алексу запустить его новую блестящую ...',
      smallImg: '/courses/uniswap/small.png',
      bigImg: '/courses/uniswap/big.png',
      rating: 2,
      alumniCount: 123,
      lessonsCount: 1,
      duration: 1,
      author: { name: 'Автор 2', image: '#' },
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      id: 'lending_advanced',
      title: 'Передовое кредитование',
      description: 'Исследуйте архитектуру AAVE и Compound и сделайте лучший проект по кредитованию ...',
      smallImg: '/courses/aave_compound/small.png',
      bigImg: '/courses/aave_compound/big.png',
      rating: 2,
      alumniCount: 123,
      lessonsCount: 1,
      duration: 1,
      author: { name: 'Автор 2', image: '#' },
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      id: 'solidity_advanced',
      title: 'Продвинутый Solidity курс',
      description: 'Изучение сложных подписей, оракулов, ценовых факторов, построение calldata, работа с multicall ...',
      smallImg: '/courses/solidity_advanced/small.png',
      bigImg: '/courses/solidity_advanced/big.png',
      rating: 2,
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      author: { name: 'Автор 2', image: '#' },
      alumniCount: 123,
      lessonsCount: 1,
      duration: 1,
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
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </section>
        </>
      )}
      {dashboardSection === 'history' && (
        <section className="mt-[37px] grid grid-cols-3 divide-x divide-y divide-[#282D33]">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      )}
    </main>
  );
}
