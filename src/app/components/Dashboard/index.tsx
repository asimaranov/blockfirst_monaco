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
      soon: false,
      info: {
        rating: 4.5,
        alumniCount: 1265,
        lessonsCount: 123,
        duration: 5,
        author: { name: 'Автор 1', image: '#' },
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
    {
      id: 'uniswap_advanced',
      title: 'Продвинутый Uniswap курс',
      description:
        'Реализуйте свой собственный uniswap с нуля и помогите Алексу запустить его новую блестящую ...',
      smallImg: '/courses/uniswap/small.png',
      bigImg: '/courses/uniswap/big.png',
      soon: false,
      info: {
        rating: 2,
        alumniCount: 123,
        lessonsCount: 1,
        duration: 1,
        author: { name: 'Автор 2', image: '#' },
        updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
    },
    {
      id: 'lending_advanced',
      title: 'Передовое кредитование',
      description:
        'Исследуйте архитектуру AAVE и Compound и сделайте лучший проект по кредитованию ...',
      smallImg: '/courses/aave_compound/small.png',
      bigImg: '/courses/aave_compound/big.png',
      soon: true,
    },
    {
      id: 'solidity_advanced',
      title: 'Продвинутый Solidity курс',
      description:
        'Изучение сложных подписей, оракулов, ценовых факторов, построение calldata, работа с multicall ...',
      smallImg: '/courses/solidity_advanced/small.png',
      bigImg: '/courses/solidity_advanced/big.png',
      soon: true,
    },
    {
      id: 'crypto_advanced',
      title: 'Криптография и математика',
      description:
        'Узнайте что такое эллиптическая кривая, узнайте, как рассчитать подпись своими руками. Изучите...',
      smallImg: '/courses/cryptography/small.png',
      bigImg: '/courses/cryptography/big.png',
      soon: true,
    },
    {
      id: 'evm_assembler',
      title: 'EVM assembler & YUL язык',
      description:
        'Изучите ассемблерные опкоды, научитесь писать ассемблерные вставки, использовать ассемблер...',
      smallImg: '/courses/evm_assembler_yul/small.png',
      bigImg: '/courses/evm_assembler_yul/big.png',
      soon: true,
    },
    {
      id: 'upgradeable_contracts',
      title: 'Обновляемые контракты',
      description:
        'Помогите Алексу сделать логику контрактов обновляемой. Изучите типы прокси...',
      smallImg: '/courses/upgradeable/small.png',
      bigImg: '/courses/upgradeable/big.png',
      soon: true,
    },
    {
      id: 'gas_advanced',
      title: 'Усовершенствованная оптимизация газа',
      description:
        'Cэкономите деньги Алекса и его пользователей, изучив и используя передовые...',
      smallImg: '/courses/advanced_gas/small.png',
      bigImg: '/courses/advanced_gas/big.png',
      soon: true,
    },
    {
      id: 'wagmi',
      title: 'Wagmi',
      description:
        'Узнаете как написать надежный и современный фронтенд для смартконтрактов. Работа с событиями, EVM, кросс...',
      smallImg: '/courses/wagmi/small.png',
      bigImg: '/courses/wagmi/big.png',
      soon: true,
    },
  ];

  const lastUpdate = new Date(
    Math.min(
      ...courses
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
            {courses?.[0] ? (
              <CourseTopCard course={courses[0]} />
            ) : (
              <Skeleton className="h-[354px] w-full" />
            )}
            <section className="divide [&>*]:border-accent divide-accent border-accent mb-[37px] grid grid-cols-1 gap-y-9 divide-x-1 sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-y">
              {courses.slice(1).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {Array.from({ length: 3 - ((courses.length - 1) % 3) }).map(
                (_, index) => (
                  <div key={index}></div>
                )
              )}
            </section>
          </>
        )}
        {dashboardSection === 'history' && (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            <div className="bg-accent flex h-full w-full flex-grow">aaa</div>
          </section>
        )}
      </div>
    </main>
  );
}
