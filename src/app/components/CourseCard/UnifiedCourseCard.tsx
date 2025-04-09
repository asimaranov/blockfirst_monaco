import { ICourse } from '~/app/lib/constants/courses';
import Image from 'next/image';
import { Star, StarGrey } from '../icons/Star';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ChevronRight } from '../icons/ChevronRight';
import { Info } from '../icons/Info';
import GridSvg from './assets/grid.svg';
import LightSvg from './assets/light.svg';
import ClockSvg from './assets/clock.svg';
import { Progress } from '../shared/Progress';
import Link from 'next/link';

type UnifiedCourseCardProps = {
  course: ICourse;
  variant?: 'default' | 'history';
  percent?: number;
  courseStudyingFor?: string;
  showProgress?: boolean;
  className?: string;
};

export function UnifiedCourseCard({
  course,
  variant = 'default',
  showProgress = true,
  percent = 0,
  courseStudyingFor = '',
  className,
}: UnifiedCourseCardProps) {
  const t = useTranslations('UserSpace');
  const isHistory = variant === 'history';

  return (
    <div
      className={`group relative flex shrink-0 flex-col items-center hover:bg-[#14171C] nth-[3n]:border-r-0 ${className}`}
    >
      <div className="bg-background relative w-full overflow-hidden">
        <div
          className={`relative z-10 transition-transform duration-400 ease-in-out ${
            !course.soon || isHistory
              ? 'group-hover:scale-120 group-hover:-rotate-30'
              : ''
          }`}
        >
          <Image
            src={course.smallImg}
            alt={course.title}
            width={320}
            height={176}
            className="w-full"
            quality={100}
          />
        </div>
        <Image
          src={GridSvg}
          alt={''}
          width={320}
          height={176}
          className="pointer-events-none absolute top-0 left-0 z-20 w-full"
          quality={100}
        />
        <div className="pointer-events-none absolute top-0 left-0 z-30 flex h-full w-full items-center justify-center">
          {course.bage?.title && (
            <span className="sm:text-xxs bg-background/30 border-foreground/20 flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-xs backdrop-blur-sm sm:px-4">
              {course.bage?.img && (
                <Image
                  src={course.bage.img}
                  alt={course.bage?.title}
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              )}
              <span className="font-delight z-30 mt-0.5">
                {course.bage?.title}
              </span>
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col p-8 px-5 pt-10 pb-10 sm:px-8 sm:pt-7 sm:pb-5">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="flex items-center gap-1 rounded-full bg-[#01050D] px-1.5 py-1 sm:px-2">
                <div className="flex">
                  {course.soon ? (
                    <>
                      <svg
                        width="30"
                        height="16"
                        viewBox="0 0 30 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-7.5"
                      >
                        <path
                          d="M8 0C10.6123 0 12.9324 1.2522 14.3923 3.18921C13.5105 4.58081 13 6.23071 13 8C13 9.76929 13.5105 11.4192 14.3923 12.8108C12.9324 14.7478 10.6123 16 8 16C3.58179 16 0 12.4182 0 8C0 3.58179 3.58179 0 8 0Z"
                          fill="#9AA6B5"
                        />
                        <path
                          d="M22 16C26.4182 16 30 12.4182 30 8C30 3.58179 26.4182 0 22 0C17.5818 0 14 3.58179 14 8C14 12.4182 17.5818 16 22 16Z"
                          fill="#9AA6B5"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <Image
                        src={'/avatars/user0.png'}
                        alt="star"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                        quality={100}
                      />
                      <Image
                        src={'/avatars/user1.png'}
                        alt="star"
                        width={16}
                        height={16}
                        className="-ml-1 h-4 w-4"
                        quality={100}
                      />
                    </>
                  )}
                </div>
                <span className="text-xs">
                  {course.info?.alumniCount || 0}+
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#01050D] px-1.5 py-1 sm:px-2">
                {course.soon ? <StarGrey /> : <Star />}
                <span className="text-xs">
                  {(course.info?.rating || 0).toFixed(1)}
                </span>
              </div>
            </div>
            {isHistory ? (
              <div className="flex items-center gap-1 text-xs text-[#33CF8E]">
                <svg
                  width="4"
                  height="4"
                  viewBox="0 0 4 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-1 w-1"
                >
                  <circle cx="2" cy="2" r="2" fill="#33CF8E" />
                </svg>
                In Progress
              </div>
            ) : (
              <div className="text-secondary text-xxs flex items-center gap-3 uppercase">
                {!course.soon ? (
                  <span>
                    {course.info?.lessonsCount || 0}{' '}
                    {t('lesson', { count: course.info?.lessonsCount || 0 })}
                  </span>
                ) : (
                  <>–</>
                )}
                <div className="bg-secondary text-xxs h-6 w-px opacity-20"></div>
                {!course.soon ? (
                  <span>
                    {course.info?.duration || 0}{' '}
                    {t('month', { count: course.info?.duration || 0 })}
                  </span>
                ) : (
                  <>–</>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium text-[#F2F2F2]">
              {course.title}
            </h3>
            <p className="text-secondary line-clamp-2 text-sm leading-5">
              {course.description}
            </p>
          </div>
        </div>

        {(showProgress || isHistory) && (
          <div className="mt-5">
            <div className="flex flex-row items-center gap-3 text-base font-semibold">
              <Image src={LightSvg} alt={''} className="h-5 w-5" />
              {percent}%
            </div>
            <Progress useFlag className="mt-3" value={percent} />
          </div>
        )}

        {isHistory ? (
          <div className="mt-6 flex w-full justify-between gap-4 text-sm">
            <Link href={`/course/${course.id}`}>
              <div className="flex">
                <button
                  className={`border-primary hover:bg-primary flex cursor-pointer items-center justify-center gap-1.5 rounded-full border px-9 py-3.5 text-center duration-300 sm:px-10 sm:py-3`}
                >
                  <Info /> Подробнее
                </button>
              </div>
            </Link>
            <div className="mr-9 flex flex-row items-center justify-center gap-1.5">
              <Image src={ClockSvg} className="h-4 w-4" alt={''} />{' '}
              {courseStudyingFor}
            </div>
          </div>
        ) : !course?.soon ? (
          <div className="mt-6 flex w-full gap-0 text-sm sm:gap-4">
            <button
              className={`border-primary hover:bg-primary flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border py-3.5 duration-300 sm:py-3`}
            >
              Начать <ChevronRight />
            </button>
            <Link
              href={`/course/${course.id}`}
              className="hover:border-secondary flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent py-3.5 duration-300 sm:py-3"
            >
              <Info /> Подробнее
            </Link>
          </div>
        ) : (
          <button
            className={`bg-background z-100 mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm sm:py-3`}
          >
            🔥Скоро🔥
          </button>
        )}
      </div>
      {course.soon && !isHistory && (
        <div className="bg-dark-bg absolute top-0 left-0 z-30 h-full w-full opacity-50"></div>
      )}
    </div>
  );
}
