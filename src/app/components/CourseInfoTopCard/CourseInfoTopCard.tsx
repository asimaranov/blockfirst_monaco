import Link from 'next/link';
import { ICourse } from '~/app/lib/constants/courses';
import Image from 'next/image';
import medalImg from 'public/misc/medal.svg';
import { AlumniCounter } from './AlumniCounter';
import { RatingCounter } from './RatingCounter';
import { CourseProgress } from './CourseProgress';
import { Progress } from '../shared/Progress';
import { useTranslations } from 'next-intl';
import GridSvg from './assets/grid.svg';
import TheoryIcon from './assets/TheoryIcon.svg';
import PracticeIcon from './assets/PracticeIcon.svg';
import VideoIcon from './assets/VideoIcon.svg';
import ClockIcon from './assets/clock.svg';

export default function CourseInfoTopCard({ course }: { course: ICourse }) {
  const t = useTranslations('UserSpace');

  return (
    <section className="border-accent relative flex flex-col gap-10">
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
          {course.info?.labelTitle && (
            <span className="bg-background/30 border-foreground/20 z-30 flex items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-bold backdrop-blur-sm">
              {course.info?.labelImg && (
                <Image
                  src={course.info.labelImg}
                  alt={course.info.labelTitle}
                  width={16}
                  height={16}
                />
              )}
              <span className="mt-0.5">{course.info?.labelTitle}</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col p-8 pt-0">
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
          <span className="text-2xll font-bold">{course.title}</span>
          <span className="text-secondary text-sm">{course.description}</span>
          <div className="flex flex-row gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image src={VideoIcon} alt="" width={14} height={14} />
              <span className="text-sm text-white">Видеолекции</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image src={PracticeIcon} alt="" width={14} height={14} />
              <span className="text-sm text-white">Практика</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image src={TheoryIcon} alt="" width={14} height={14} />
              <span className="text-sm text-white">Теория</span>
            </div>
          </div>
        </div>
        <CourseProgress progress={4} className="mt-6" />
        <div className="mt-[1.852vw] flex flex-row items-center justify-between gap-4">
          <Link
            href={`#`}
            className={
              'bg-primary border-primary flex w-full flex-col items-center justify-center rounded-full border py-3 duration-300 hover:bg-transparent'
            }
          >
            <div className="flex flex-row items-center">
              <span className="text-[0.81vw] leading-[1.157vw] text-[#F2F2F2]">
                Продолжить
              </span>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.2307 4.43278C14.5295 4.14596 15.0043 4.1557 15.2911 4.45454L19.9065 9.26327C20.185 9.55348 20.185 10.0117 19.9065 10.302L15.2911 15.1107C15.0043 15.4095 14.5295 15.4193 14.2307 15.1324C13.9318 14.8456 13.9221 14.3708 14.2089 14.072L18.3258 9.78261L14.2089 5.49322C13.9221 5.19438 13.9318 4.7196 14.2307 4.43278Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </Link>
          <div
            className="flex w-full flex-col items-center justify-center rounded-full"
          >
            <div className="flex flex-row items-center">
              <span className="text-secondary text-sm opacity-50 mr-2.5">
                Обучаешься:{' '}
              </span>

              <Image src={ClockIcon} alt="" width={16} height={16} className='mr-1.5' />
              <span className="text-sm text-white">10 дней</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
