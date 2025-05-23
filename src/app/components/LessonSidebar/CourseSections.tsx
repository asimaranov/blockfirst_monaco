'use client';

import { CourseSection } from './CourseSection';
import {
  useCallback,
  useEffect,
  useMemo,
  createContext,
  useState,
} from 'react';
import { api } from '~/trpc/react';

// Type definitions for pre-loaded course data
type LessonType = {
  id: string;
  title: string;
  status?: 'available' | 'in-progress' | 'completed' | 'completedNoExtra';
  parentId: string;
};

type ModuleType = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  progress: number;
  total: number;
  status: 'available' | 'upcoming' | 'locked';
  parentId: string;
  lessons: LessonType[];
};

type SectionType = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  status: 'available' | 'locked' | 'upcoming';
  finalTestStatus: 'available' | 'locked' | 'completed';
  finalTestId: string;
  parentId: string;
  modules: ModuleType[];
};

type CourseType = {
  id: string;
  sections: SectionType[];
  // Map to quickly look up document information
  documentsMap: {
    [id: string]: {
      type: 'lesson' | 'module' | 'section';
      parentId: string;
      title: string;
    };
  };
};

// Module type for component props
type Module = {
  title: string;
  icon: React.ReactNode;
  lessons: {
    id: string;
    title: string;
    status?: 'available' | 'in-progress' | 'completed' | 'completedNoExtra';
    isActive: boolean;
  }[];
  progress: number;
  total: number;
  status: 'available' | 'upcoming' | 'locked';
};

// Create context to store and share course data across renders
type CourseContextType = {
  courseData: CourseType | null;
  loading: boolean;
  setCourseData: (data: CourseType) => void;
  getHierarchy: (lessonId: string) => {
    lessonId: string;
    moduleId: string;
    sectionId: string;
    courseId: string;
  } | null;
};

const CourseContext = createContext<CourseContextType>({
  courseData: null,
  loading: true,
  setCourseData: () => {},
  getHierarchy: () => null,
});

// Icons remain unchanged
const CodeIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M8.0026 16.6673H12.0026C15.3359 16.6673 16.6693 15.334 16.6693 12.0007V8.00065C16.6693 4.66732 15.3359 3.33398 12.0026 3.33398H8.0026C4.66927 3.33398 3.33594 4.66732 3.33594 8.00065V12.0007C3.33594 15.334 4.66927 16.6673 8.0026 16.6673Z"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.39875 7.97852L6.73875 9.63852C6.54542 9.83185 6.54542 10.1585 6.73875 10.3518L8.39875 12.0118"
          stroke="#9AA6B5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5977 7.97852L13.2577 9.63852C13.451 9.83185 13.451 10.1585 13.2577 10.3518L11.5977 12.0118"
          stroke="#9AA6B5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

const MultiSigIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M5.33203 11.9987V7.33203"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.4987 16.6654C6.69531 16.6654 7.66536 15.6953 7.66536 14.4987C7.66536 13.3021 6.69531 12.332 5.4987 12.332C4.30208 12.332 3.33203 13.3021 3.33203 14.4987C3.33203 15.6953 4.30208 16.6654 5.4987 16.6654Z"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.33203 7.33203C6.4366 7.33203 7.33203 6.4366 7.33203 5.33203C7.33203 4.22746 6.4366 3.33203 5.33203 3.33203C4.22746 3.33203 3.33203 4.22746 3.33203 5.33203C3.33203 6.4366 4.22746 7.33203 5.33203 7.33203Z"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.668 7.33203C15.7725 7.33203 16.668 6.4366 16.668 5.33203C16.668 4.22746 15.7725 3.33203 14.668 3.33203C13.5634 3.33203 12.668 4.22746 12.668 5.33203C12.668 6.4366 13.5634 7.33203 14.668 7.33203Z"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.41797 12.0019C5.71797 10.8353 6.78463 9.96859 8.04463 9.97526L10.3313 9.98193C12.078 9.9886 13.5646 8.86859 14.1113 7.30859"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

// Main component for course sections sidebar
export function CourseSections({
  lessonId,
  courseInfo: courseData,
}: {
  lessonId: string;
  courseInfo: any;
}) {
  const [activeLessonId, setActiveLessonId] = useState(lessonId);
  const lessons = Object.values(courseData.documentsMap).filter(
    (doc: any) => doc.type === 'lesson'
  );

  console.log('[lessons] lessons', lessons);

  const progress = api.progress.getLessonsProgress.useQuery({
    lessonIds: lessons.map((lesson) => (lesson as any).id)
  });

  useEffect(() => {
    if (progress.data) {
      console.log('[progress] data', progress.data);
    }
  }, [progress.data]);


  const getHierarchy = useCallback(
    (lessonId: string) => {
      if (!courseData || !courseData.documentsMap[lessonId]) return null;

      const lesson = courseData.documentsMap[lessonId];
      const moduleId = lesson.parentId;
      const module = courseData.documentsMap[moduleId];
      const sectionId = module.parentId;

      return {
        lessonId,
        moduleId,
        sectionId,
        courseId: courseData.id,
      };
    },
    [courseData]
  );

  // Update active lesson ID when URL changes
  useEffect(() => {
    setActiveLessonId(lessonId);
  }, [lessonId]);

  // Determine hierarchy for current lesson
  const hierarchy = useMemo(() => {
    return getHierarchy(activeLessonId);
  }, [activeLessonId, getHierarchy]);

  if (!courseData) {
    return <div className="p-4">Loading course content...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1">
        {courseData.sections.map((section: any) => (
          <CourseSection
            key={section.id}
            title={section.title}
            status={'available'}
            modules={
              section.modules.map((module: any) => ({
                title: module.title,
                icon: module.icon || <CodeIcon />,
                progress: module.progress,
                total: module.total,
                status: module.status,
                lessons: module.lessons.map((lesson: any) => ({
                  id: lesson.id,
                  title: lesson.title,
                  status: progress.data?.find((p: any) => p.lessonId === lesson.id)?.status || lesson.status,
                  isActive: lesson.id === activeLessonId,
                })),
              })) as Module[]
            }
            finalTestStatus={section.finalTestStatus}
            expanded={hierarchy ? section.id === hierarchy.sectionId : false}
            finalTestId={section.finalTestId}
          />
        ))}
      </div>
    </div>
  );
}
