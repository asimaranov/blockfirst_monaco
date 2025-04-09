import { COURSES } from '~/app/lib/constants/courses';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseTopCard } from '~/app/components/CourseTopCard';
import { UnifiedCourseCard } from '../CourseCard/UnifiedCourseCard';
import { cn } from '~/helpers';

export async function CoursesTab() {
  const coursesList = COURSES.slice(1);

  return (
    <div className="grid grid-cols-1 gap-0 sm:gap-8">
      <div className="hidden sm:flex">
        {COURSES?.[0] ? (
          <CourseTopCard course={COURSES[0]} />
        ) : (
          <Skeleton className="h-88.5 w-full" />
        )}
      </div>

      <div className="block sm:hidden">
        <UnifiedCourseCard
          key={COURSES[0]!.id}
          course={COURSES[0]!}
          variant="default"
          showProgress={true}
          className="not-first:border-t sm:border-y"
        />
        <div className="border-accent flex flex-row gap-3 border-t p-5 pt-10 text-base">
          <div>Другие курсы</div>
          <div className="bg-foreground text-background flex h-5 w-7.5 items-center justify-center rounded-[100px] text-center text-sm font-medium">
            <span className="mt-[0.0579vw] leading-4">8</span>
          </div>
        </div>
      </div>

      <section className="divide [&>*]:border-accent divide-accent border-accent grid grid-cols-1 gap-y-0 divide-x-0 sm:grid-cols-3 sm:gap-y-9 sm:divide-x-1">
        {coursesList.map((course, index) => (
          <UnifiedCourseCard
            key={course.id}
            course={course}
            variant="default"
            showProgress={false}
            className={cn('sm:border-y', index !== 0 && 'border-t')}
          />
        ))}
        {Array.from({
          length: 3 - (coursesList.length % 3),
        }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'sm:border-y',
              index !== 0 && 'border-t',
              'nth-[3n]:border-r-0'
            )}
          ></div>
        ))}
      </section>
    </div>
  );
}
