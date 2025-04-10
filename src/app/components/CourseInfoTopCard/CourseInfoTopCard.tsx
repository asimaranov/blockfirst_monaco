'use server';
import Link from 'next/link';
import { ICourse } from '~/app/lib/constants/courses';
import Image from 'next/image';
import { AlumniCounter } from './AlumniCounter';
import { RatingCounter } from './RatingCounter';
import { CourseProgress } from './CourseProgress';
// import { useTranslations,  } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { CourseBadge } from '../shared/CourseBadge';

import GridSvg from './assets/grid.svg';
import TheoryIcon from './assets/TheoryIcon.svg';
import PracticeIcon from './assets/PracticeIcon.svg';
import VideoIcon from './assets/VideoIcon.svg';
import ClockIcon from './assets/clock.svg';

export default async function CourseInfoTopCard({
  course,
}: {
  course: ICourse;
}) {
  const t = await getTranslations('UserSpace');

  return (
    <section className="border-accent static top-0 flex flex-col gap-10 self-start sm:sticky">
      <div className="bg-background relative z-0">
        <Image
          src={GridSvg}
          alt={''}
          width={608}
          height={354}
          className="absolute top-0 left-0 z-20 w-full"
          quality={100}
        />
        <Image
          src={course.bigImg}
          alt={course.title}
          width={608}
          height={354}
          className="w-full"
          quality={100}
        />
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
          {course.bage?.title && (
            <CourseBadge
              badge={course.bage}
              className="px-6 py-4 pr-6.75 leading-3.5 sm:leading-4"
            />
          )}
        </div>
      </div>

      <div className="flex w-full flex-col p-5 pt-0 sm:p-8 sm:pt-0">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <AlumniCounter count={course.info!.alumniCount} />
            <RatingCounter rating={course.info!.rating} />
          </div>
          <div className="text-xxs flex flex-row items-center">
            <span className="border-secondary/20 border-r pr-3 font-medium text-[#9AA6B5] uppercase">
              {course.info?.lessonsCount || 0}{' '}
              {t('lesson', { count: course.info?.lessonsCount || 0 })}
            </span>
            <span className="text-secondary pl-3 font-medium uppercase">
              {course.info?.duration || 0}{' '}
              {t('month', { count: course.info?.duration || 0 })}
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <span className="sm:text-2xll text-xl font-bold">{course.title}</span>
          <span className="text-secondary line-clamp-4 text-sm">
            {course.aboutText || course.description}
          </span>
          <div className="flex flex-row gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image
                src={VideoIcon}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5"
              />
              <span className="text-foreground text-xs">Видеолекции</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image
                src={PracticeIcon}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5"
              />
              <span className="text-foreground text-xs">Практика</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image
                src={TheoryIcon}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5"
              />
              <span className="text-foreground text-xs">Теория</span>
            </div>
          </div>
        </div>
        <CourseProgress progress={4} className="mt-6" />
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <Link
            href={`#`}
            className={
              'bg-primary border-primary flex w-full flex-col items-center justify-center rounded-full border py-3 duration-300 hover:bg-transparent'
            }
          >
            <div className="flex flex-row items-center">
              <span className="text-sm leading-[1.157vw] text-[#F2F2F2]">
                Продолжить
              </span>
              <Image
                src={'/images/icons/forward-arrow.svg'}
                alt=""
                width={21}
                height={20}
                className="h-5 w-5"
              />
            </div>
          </Link>
          <div className="flex w-full flex-col items-center justify-center rounded-full">
            <div className="flex flex-row items-center">
              <span className="text-secondary mr-2 text-xs opacity-50 sm:mr-2.5 sm:text-sm">
                Обучаешься:{' '}
              </span>

              <Image
                src={ClockIcon}
                alt=""
                width={16}
                height={16}
                className="mr-1 h-4 w-4 sm:mr-1.5"
              />
              <span className="text-foreground text-xs sm:text-sm">
                10 дней
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
