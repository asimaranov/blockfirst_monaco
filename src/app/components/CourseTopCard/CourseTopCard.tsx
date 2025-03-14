import Link from 'next/link';
import { ICourse } from '~/app/lib/types/ICourse';
import Image from 'next/image';
import medalImg from 'public/misc/medal.svg';
import { AlumniCounter } from './AlumniCounter';
import { RatingCounter } from './RatingCounter';
import { CourseProgress } from './CourseProgress';
import { Progress } from '../shared/Progress';
import { useTranslations } from 'next-intl';

export function CourseTopCard({ course }: { course: ICourse }) {
  const t = useTranslations('UserSpace');

  return (
    <section className="flex flex-row gap-10 border-b border-[#282D33]">
      <Image
        src={course.bigImg}
        alt={course.title}
        width={608}
        height={354}
        className="w-[35.185vw] shrink-0 object-cover object-center"
        quality={100}
      />
      <div className="flex w-full flex-col py-8 pr-8">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <AlumniCounter count={course.alumniCount} />
            <RatingCounter rating={course.rating} />
          </div>
          <div className="flex flex-row items-center">
            <span className="border-r border-[#9AA6B5] border-opacity-20 pr-3 font-roboto text-[0.579vw] font-medium uppercase text-[#9AA6B5]">
              {course.lessonsCount}{' '}
              {t('lesson', { count: course.lessonsCount })}
            </span>
            <span className="pl-3 font-roboto text-[0.579vw] font-medium uppercase text-[#9AA6B5]">
              {course.duration} {t('month', { count: course.duration })}
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <span className="font-roboto text-[1.62vw] font-bold text-[#F2F2F2]">
            {course.title}
          </span>
          <span className="font-roboto text-[0.81vw] leading-[1.157vw] text-[#9AA6B5]">
            {course.description}
          </span>
        </div>
        <CourseProgress progress={4} className="mt-6" />
        <div className="mt-[1.852vw] flex flex-row items-center justify-between gap-4">
          <Link
            href={`#`}
            className={
              'flex w-full flex-col items-center justify-center rounded-full bg-[#195AF4] py-3 hover:opacity-80'
            }
          >
            <div className="flex flex-row items-center gap-[0.868vw]">
              <span className="font-roboto text-[0.81vw] leading-[1.157vw] text-[#F2F2F2]">
                Продолжить
              </span>
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-[0.405vw]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.230661 0.432781C0.5295 0.145957 1.00427 0.155698 1.2911 0.454538L5.90648 5.26327C6.18502 5.55348 6.18502 6.01175 5.90648 6.30195L1.2911 11.1107C1.00427 11.4095 0.5295 11.4193 0.230661 11.1324C-0.0681787 10.8456 -0.0779195 10.3708 0.208904 10.072L4.32583 5.78261L0.208904 1.49322C-0.0779195 1.19438 -0.0681787 0.719605 0.230661 0.432781Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </Link>
          <Link
            href={`#`}
            className="flex w-full flex-col items-center justify-center hover:opacity-80"
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
              <span className="font-roboto text-[0.81vw] leading-[1.157vw] text-[#F2F2F2]">
                Подробнее о курсе
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
