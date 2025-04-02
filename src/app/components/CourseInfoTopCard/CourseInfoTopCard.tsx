import Link from 'next/link';
import { ICourse } from '~/app/lib/constants/courses';
import Image from 'next/image';
import { AlumniCounter } from './AlumniCounter';
import { RatingCounter } from './RatingCounter';
import { CourseProgress } from './CourseProgress';
import { useTranslations } from 'next-intl';
import GridSvg from './assets/grid.svg';
import TheoryIcon from './assets/TheoryIcon.svg';
import PracticeIcon from './assets/PracticeIcon.svg';
import VideoIcon from './assets/VideoIcon.svg';
import ClockIcon from './assets/clock.svg';

export default function CourseInfoTopCard({ course }: { course: ICourse }) {
  const t = useTranslations('UserSpace');

  return (
    <section className="border-accent static sm:sticky top-0 flex flex-col gap-10 self-start">
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
            <span className="bg-background/30 border-foreground/20 z-30 flex items-center justify-center gap-2 rounded-full border px-6 py-3 sm:py-4 text-sm  backdrop-blur-sm font-delight">
              {course.bage?.img && (
                <Image
                  src={course.bage.img}
                  alt={course.bage.title}
                  width={16}
                  height={16}
                  className='h-4 w-4'
                />
              )}
              <span className="mt-0.5 font-delight">{course.bage.title}</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col p-5 sm:p-8 pt-0 sm:pt-0">
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
          <span className="text-secondary text-sm line-clamp-4">{course.aboutText || course.description}</span>
          <div className="flex flex-row gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image src={VideoIcon} alt="" width={14} height={14} className='h-3.5 w-3.5'/>
              <span className="text-foreground text-xs">Видеолекции</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image src={PracticeIcon} alt="" width={14} height={14} className='h-3.5 w-3.5'/>
              <span className="text-foreground text-xs">Практика</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-[#282C32] px-4 py-2">
              <Image src={TheoryIcon} alt="" width={14} height={14} className='h-3.5 w-3.5'/>
              <span className="text-foreground text-xs">Теория</span>
            </div>
          </div>
        </div>
        <CourseProgress progress={4} className="mt-6" />
        <div className="mt-8 flex flex-col-reverse sm:flex-row  items-center justify-between gap-4">
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
              <Image src={'/images/icons/forward-arrow.svg'} alt="forward-arrow" width={21} height={20} className="h-5 w-5" />

            </div>
          </Link>
          <div className="flex w-full flex-col items-center justify-center rounded-full">
            <div className="flex flex-row items-center">
              <span className="text-secondary mr-2 sm:mr-2.5 text-xs sm:text-sm opacity-50">
                Обучаешься:{' '}
              </span>

              <Image
                src={ClockIcon}
                alt=""
                width={16}
                height={16}
                className="mr-1 sm:mr-1.5 h-4 w-4"
              />
              <span className="text-foreground text-xs sm:text-sm">10 дней</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
