import { ICourse } from '~/app/lib/types/ICourse';
import Image from 'next/image';
export function CourseCard({ course }: { course: ICourse }) {
  return (
    <div className="flex flex-col">
      <div className='w-[343px] mb-7'>
        {/* <Image
          src={course.coverImg}
          alt={course.title}
          width={320}
          height={176}
          className="h-[193px]"
        /> */}
      </div>

    </div>
  );
}
