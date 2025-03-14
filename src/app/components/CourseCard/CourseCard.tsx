import { ICourse } from '~/app/lib/types/ICourse';
import Image from 'next/image';
import { Star, StarGrey } from '../icons/Star';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ChevronRight } from '../icons/ChevronRight';
import { Info } from '../icons/Info';
import { Skeleton } from '../shared/Skeleton';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ variant, children, onClick }: ButtonProps) => {
  const baseStyles = 'h-11 rounded-full flex items-center justify-center gap-2';
  const variantStyles = {
    primary: 'border border-primary text-[#F2F2F2]',
    secondary: 'text-[#F2F2F2]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} w-[169px]`}
      onClick={onClick}
    >
      {variant === 'secondary' && <Info />}
      {children}
      {variant === 'primary' && <ChevronRight />}
    </button>
  );
};

export function CourseCard({ course }: { course: ICourse }) {
  const t = useTranslations('UserSpace');

  return (
    <div className="relative flex shrink-0 flex-col items-center">
      {course.soon && (
        <div className="bg-dark-bg absolute top-0 left-0 h-full w-full opacity-50"></div>
      )}

      <div className="mb-7 w-full bg-background">
        <Image
          src={course.smallImg}
          alt={course.title}
          width={320}
          height={176}
          className="w-full "
        />
      </div>
      <div className="flex w-full flex-col gap-6 p-8 pt-7">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="flex items-center gap-1 rounded-full bg-[#01050D] px-3 py-1">
                <div className="flex">
                  {course.soon ? (
                    <>
                      <div className="bg-secondary h-4 w-4 rounded-full" />
                      <div className="bg-secondary -ml-1 h-4 w-4 rounded-full" />
                    </>
                  ) : (
                    <>
                      <Image
                        src={'/avatars/user0.png'}
                        alt="star"
                        width={16}
                        height={16}
                      />
                      <Image
                        src={'/avatars/user1.png'}
                        alt="star"
                        width={16}
                        height={16}
                        className="-ml-1"
                      />
                    </>
                  )}
                </div>
                <span className="text-sm text-[#F2F2F2]">
                  {course.info?.alumniCount || 0}+
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#01050D] px-3 py-1">
                {course.soon ? <StarGrey /> : <Star />}
                <span className="text-sm text-[#F2F2F2]">
                  {(course.info?.rating || 0).toFixed(1)}
                </span>
              </div>
            </div>
            <div className="text-secondary flex items-center gap-3 text-sm">
              {!course.soon ? (
                <span>
                  {course.info?.lessonsCount || 0}{' '}
                  {t('lesson', { count: course.info?.lessonsCount || 0 })}
                </span>
              ) : (
                <>–</>
              )}
              <div className="bg-secondary h-6 w-px opacity-20"></div>
              {!course.soon ? (
                <span>
                  {course.info?.duration || 0}{' '}
                  {t('month', { count: course.info?.duration || 0 })}
                </span>
              ) : (
                <>–</>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-[#F2F2F2]">
              {course.title}
            </h3>
            <p className="text-secondary text-sm leading-5">
              {course.description}
            </p>
          </div>
        </div>
        {!course?.soon ? (
          <div className="flex w-full gap-4 text-sm">
            <button
              className={`border-primary hover:bg-primary duration-300 flex flex-1 h-11  items-center justify-center gap-2 rounded-full border cursor-pointer`}
            >
              Начать <ChevronRight />
            </button>
            <button
              className={`border border-transparent hover:border-secondary duration-300 flex h-11 flex-1 items-center justify-center gap-2 rounded-full  cursor-pointer`}
            >
              <Info /> Подробнее
            </button>
          </div>
        ) : (
          <button
            className={`flex h-11 w-full items-center justify-center gap-2 rounded-full`}
          >
            🔥Скоро🔥
          </button>
        )}
      </div>
    </div>
  );
}
