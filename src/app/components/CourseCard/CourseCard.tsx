import { ICourse } from '~/app/lib/types/ICourse';
import Image from 'next/image';
import { Star } from '../icons/Star';
import { Button } from '../Button/Button';

export function CourseCard({ course }: { course: ICourse }) {
  
  return (
    <div className="flex flex-shrink-0 flex-col items-center border border-accent">
      <div className="mb-7 w-full">
        <Image
          src={course.smallImg}
          alt={course.title}
          width={320}
          height={176}
          className="w-full"
        />
      </div>
      <div className="flex w-full flex-col gap-6 p-8 pt-7">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="flex items-center gap-1 rounded-full bg-[#01050D] px-3 py-1">
                <div className="flex">
                  <Image src={'/avatars/user0.png'} alt="star" width={16} height={16} />
                  <Image src={'/avatars/user1.png'} alt="star" width={16} height={16} className='-ml-1' />

                </div>
                <span className="text-sm text-[#F2F2F2]">{course.alumniCount}+</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#01050D] px-3 py-1">
                <Star />
                <span className="text-sm text-[#F2F2F2]">
                  {course.rating}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#9AA6B5]">
              <span>{course.lessonsCount} уроков</span>
              <div className="h-6 w-px bg-[#9AA6B5] opacity-20"></div>
              <span>{course.duration}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-[#F2F2F2]">
              {course.title}
            </h3>
            <p className="text-sm leading-5 text-[#9AA6B5]">
              {course.description}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="primary">Начать</Button>
          <Button variant="secondary">Подробнее</Button>
        </div>
      </div>
    </div>
  );
}
