'use server';
import { Topbar } from './Topbar';
import { COURSE_DATA, COURSES } from '~/app/lib/constants/courses';
import { CourseInfoTopCard } from '~/app/components/CourseInfoTopCard';
import Footer from '~/app/components/Footer';
import Image from 'next/image';
import { TARIFFS } from '~/app/lib/constants/tariff';
import TariffCard from './components/TariffCard';
import tasksIcon from './assets/tasks-icon.svg';
import testsIcon from './assets/tests-icon.svg';
import CourseStatItem, { CourseStat } from './components/CourseStatItem';
import MobileAuthorInfo from './components/MobileAuthorInfo';
import TariffSection from './components/TariffSection';
import CourseSection from './components/CourseSection';
import { CourseStructurePopover } from './components/CourseStructurePopover';

const courseStats: CourseStat[] = [
  {
    type: 'lessons',
    label: 'Задач в курсе',
    icon: <Image src={tasksIcon} alt={''} className="h-9 w-9" />,
  },
  {
    type: 'tests',
    label: 'Практических тестов',
    icon: <Image src={testsIcon} alt={''} className="h-9 w-9" />,
  },
  {
    type: 'lectures',
    label: 'Лекций в курсе',
    icon: <Image src={tasksIcon} alt={''} className="h-9 w-9" />,
  },
];

export default async function CoursePage({ courseId }: { courseId: string }) {
  const course = COURSES.find((x) => x.id === courseId)!;
  const courseData = COURSE_DATA[courseId as keyof typeof COURSE_DATA];

  return (
    <main className="border-accent border-r-0 border-l-0 sm:border-r sm:border-l">
      <Topbar
        courseAuthor={course?.info?.author.name ?? ''}
        courseAuthorAvatar={course?.info?.author.image ?? ''}
      />
      <MobileAuthorInfo />
      <div className="border-accent grid grid-cols-1 border-b sm:grid-cols-2">
        <CourseInfoTopCard course={course} />
        <div className="border-accent flex flex-col border-l-0 sm:border-l">
          {/* Top section with Starter and Pro blocks */}
          <div className="border-accent divide-accent hidden flex-row divide-x border-b sm:flex">
            {TARIFFS.slice(1).map((tariff) => (
              <TariffCard key={tariff.name} tariff={tariff} />
            ))}
          </div>
          <div className="h-9.5 w-full"></div>

          <div className="mt-1.5 mb-10 flex flex-col gap-10 sm:hidden">
            {TARIFFS[1] && <TariffSection tariff={TARIFFS[1]} />}
            {TARIFFS[2] && <TariffSection tariff={TARIFFS[2]} />}
          </div>

          {/* Bottom section with stats */}
          <div className="border-accent divide-accent mb-10 flex flex-col divide-y border-t border-b sm:mb-0 sm:flex-row sm:divide-x sm:divide-y-0">
            {courseStats.map((stat, index) => (
              <CourseStatItem
                key={index}
                stat={{ ...stat, value: courseData.stats[stat.type] }}
              />
            ))}
          </div>

          {/* Tariff sections */}

          <div className="flex flex-row justify-between px-5 py-4 sm:px-8">
            <span className="text-secondary/50 text-sm uppercase sm:text-xs">
              Структура курса
            </span>
            <CourseStructurePopover />
          </div>
          <div className="flex flex-col gap-8">
            {courseData.structure.map((section) => (
              <CourseSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
