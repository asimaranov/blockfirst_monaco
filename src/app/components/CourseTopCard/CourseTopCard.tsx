import Link from 'next/link';
import { ICourse } from '~/app/lib/types/ICourse';
import Image from 'next/image';
import medalImg from 'public/misc/medal.svg';
import { AlumniCounter } from './AlumniCounter';
import { RatingCounter } from './RatingCounter';
import { CourseProgress } from './CourseProgress';
import { Progress } from '../shared/Progress';
import { useTranslations } from 'next-intl';
import GridSvg from './assets/grid.svg';

export function CourseTopCard({ course }: { course: ICourse }) {
  const t = useTranslations('UserSpace');

  return (
    <section className="divide-accent border-accent relative flex flex-row gap-10 divide-x border-b">
      <Image
        src={GridSvg}
        alt={''}
        width={608}
        height={354}
        className="absolute w-157 object-cover object-center"
        quality={100}
      />
      <div className="relative h-full w-157 shrink-0">
        <Image
          src={course.bigImg}
          alt={course.title}
          width={608}
          height={354}
          className="w-157 object-cover object-center"
          quality={100}
        />
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
          <span className="flex items-center justify-center gap-2 bg-background/30 border-foreground/20 rounded-full border px-4 py-3 text-sm font-bold backdrop-blur-sm">
            {course.info?.labelImg && (
              <Image
                src={course.info.labelImg}
                alt={course.info.labelTitle}
                width={16}
                height={16}
              />
            )}
            {course.info?.labelTitle}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col py-8 pr-8">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <AlumniCounter count={course.info!.alumniCount} />
            <RatingCounter rating={course.info!.rating} />
          </div>
          <div className="text-xxs flex flex-row items-center">
            <span className="border-opacity-20 border-secondary border-r pr-3 font-medium text-[#9AA6B5] uppercase">
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.2307 4.43278C14.5295 4.14596 15.0043 4.1557 15.2911 4.45454L19.9065 9.26327C20.185 9.55348 20.185 10.0117 19.9065 10.302L15.2911 15.1107C15.0043 15.4095 14.5295 15.4193 14.2307 15.1324C13.9318 14.8456 13.9221 14.3708 14.2089 14.072L18.3258 9.78261L14.2089 5.49322C13.9221 5.19438 13.9318 4.7196 14.2307 4.43278Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </Link>
          <Link
            href={`#`}
            className="hover:border-secondary flex h-full w-full flex-col items-center justify-center rounded-full border border-transparent duration-300"
          >
            <div className="flex flex-row items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM8 6.83333C8.27614 6.83333 8.5 7.05719 8.5 7.33333V10.6667C8.5 10.9428 8.27614 11.1667 8 11.1667C7.72386 11.1667 7.5 10.9428 7.5 10.6667V7.33333C7.5 7.05719 7.72386 6.83333 8 6.83333ZM8 6C8.36819 6 8.66667 5.70152 8.66667 5.33333C8.66667 4.96514 8.36819 4.66667 8 4.66667C7.63181 4.66667 7.33333 4.96514 7.33333 5.33333C7.33333 5.70152 7.63181 6 8 6Z"
                  fill="#F2F2F2"
                />
              </svg>
              <span className="text-sm">Подробнее о курсе</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
