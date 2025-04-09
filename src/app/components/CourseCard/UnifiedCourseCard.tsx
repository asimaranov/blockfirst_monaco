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
      <div className="flex w-full flex-col p-8 px-5 pt-7 sm:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="flex items-center gap-1 rounded-full bg-[#01050D] px-2 py-1">
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
                          d="M8 16C12.4183 16 16 12.4182 16 8C16 3.58179 12.4183 0 8 0C3.58167 0 0 3.58179 0 8C0 12.4182 3.58167 16 8 16Z"
                          fill="#9AA6B5"
                        />
                        <path
                          d="M17.0017 8C17.0017 9.76929 16.4912 11.4192 15.6094 12.8108C17.0693 14.7478 19.3893 16 22.0017 16C26.42 16 30.0017 12.4182 30.0017 8C30.0017 3.58179 26.42 0 22.0017 0C19.3893 0 17.0693 1.2522 15.6094 3.18921C16.4912 4.58081 17.0017 6.23071 17.0017 8Z"
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
                      />
                      <Image
                        src={'/avatars/user1.png'}
                        alt="star"
                        width={16}
                        height={16}
                        className="-ml-1 h-4 w-4"
                      />
                    </>
                  )}
                </div>
                <span className="text-xs">
                  {course.info?.alumniCount || 0}+
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#01050D] px-2 py-1">
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
              <button
                className={`border-primary hover:bg-primary flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-10 duration-300`}
              >
                <Info /> Подробнее
              </button>
            </Link>
            <div className="mr-9 flex flex-row items-center justify-center gap-1.5">
              <Image src={ClockSvg} className="h-4 w-4" alt={''} />{' '}
              {courseStudyingFor}
            </div>
          </div>
        ) : !course?.soon ? (
          <div className="mt-6 flex w-full gap-4 text-sm">
            <button
              className={`border-primary hover:bg-primary flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border duration-300`}
            >
              Начать <ChevronRight />
            </button>
            <Link
              href={`/course/${course.id}`}
              className="hover:border-secondary flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent duration-300"
            >
              <Info /> Подробнее
            </Link>
          </div>
        ) : (
          <button
            className={`bg-background z-100 mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm`}
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
