'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '~/server/auth/client';
import { Topbar } from '../components/Dashboard/Topbar';
import { cn } from '~/helpers';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ICourse } from '../lib/types/ICourse';
import { Skeleton } from '../components/shared/Skeleton';
import { CourseTopCard } from '../components/CourseTopCard';
import { CourseCard } from '../components/CourseCard/CourseCard';

export default function DashboardPage() {
  const session = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  console.log(JSON.stringify(session, null, 2));

  useEffect(() => {
    if (!session.data && !session.isPending) {
      console.log('Attempt to check 1', JSON.stringify(session, null, 2));

      setTimeout(() => {
        if (!session.data && !session.isPending) {
          router.push('/signin');
        }
      }, 1000);
    }
  }, [session]);

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

  return (
    <main className="border-x border-[#282D33]">
      <Topbar className="justify-between">
        <div className="flex h-[2.315vw] w-[12.384vw] flex-row overflow-hidden rounded-full bg-[#01050D]">
          <Link
            href="/dashboard"
            className={cn(
              'flex w-full flex-col items-center justify-center font-roboto text-[0.81vw] font-medium hover:opacity-80',
              pathname === '/dashboard'
                ? 'rounded-r-full bg-[#F2F2F2] text-[#01050D]'
                : 'bg-transparent text-[#F2F2F2]'
            )}
          >
            Курсы
          </Link>
          <Link
            href="/dashboard/history"
            className={cn(
              'flex w-full flex-col items-center justify-center font-roboto text-[0.81vw] font-medium hover:opacity-80',
              pathname === '/dashboard/history'
                ? 'rounded-l-full bg-[#F2F2F2] text-[#01050D]'
                : 'bg-transparent text-[#F2F2F2]'
            )}
          >
            История
          </Link>
        </div>
        <div className="flex flex-col gap-[0.463vw]">
          <div className="flex flex-row items-center justify-end gap-[0.463vw]">
            <div className="h-[0.347vw] w-[0.347vw] rounded-full bg-[#54EDB7]" />
            <span className="font-roboto text-[0.81vw] font-medium text-[#F2F2F2]">
              {new Date(
                Math.min(
                  ...courses.map((course) =>
                    new Date(course.updatedAt).getTime()
                  )
                )
              ).toLocaleDateString('ru-RU')}
            </span>
          </div>
          <span className="font-roboto text-[0.694vw] text-[#9AA6B5] opacity-50">
            Последнее обновление
          </span>
        </div>
      </Topbar>
      {courses?.[0] ? (
        <CourseTopCard course={courses[0]} />
      ) : (
        <Skeleton className="h-[20.486vw] w-full" />
      )}
      <section className="mt-[2.141vw] grid grid-cols-3 border-y border-[#282D33]">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </section>
    </main>
  );
}
