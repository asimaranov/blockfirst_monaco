import { COURSES } from '~/app/lib/constants/courses';
import { UnifiedCourseCard } from '../CourseCard/UnifiedCourseCard';
import { cn } from '~/helpers';

export async function HistoryTab() {
  const coursesList = COURSES.filter((x) => !x.soon);

  return (
    <div className="grid grid-cols-1 gap-0 sm:gap-8">
      <section className="divide [&>*]:border-accent divide-accent border-accent grid grid-cols-1 gap-y-0 divide-x-0 sm:grid-cols-3 sm:gap-y-9 sm:divide-x-1">
        {coursesList.map((course, index) => (
          <UnifiedCourseCard
            key={course.id}
            course={course}
            variant="history"
            className={cn('sm:border-y', index !== 0 && 'border-t')}
            percent={57}
            courseStudyingFor={'1д 12ч 48м'}
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
