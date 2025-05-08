'use client';

import { redirect, usePathname } from 'next/navigation';
import { CourseSection } from './CourseSection';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import {
  useCallback,
  useEffect,
  useMemo,
  createContext,
  useContext,
  useState,
} from 'react';

// Type definitions for pre-loaded course data
type LessonType = {
  id: string;
  title: string;
  status?: 'available' | 'skipped' | 'completed' | 'completedNoExtra';
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
    status?: 'available' | 'skipped' | 'completed' | 'completedNoExtra';
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
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.39875 7.97852L6.73875 9.63852C6.54542 9.83185 6.54542 10.1585 6.73875 10.3518L8.39875 12.0118"
          stroke="#9AA6B5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.5977 7.97852L13.2577 9.63852C13.451 9.83185 13.451 10.1585 13.2577 10.3518L11.5977 12.0118"
          stroke="#9AA6B5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
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
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.4987 16.6654C6.69531 16.6654 7.66536 15.6953 7.66536 14.4987C7.66536 13.3021 6.69531 12.332 5.4987 12.332C4.30208 12.332 3.33203 13.3021 3.33203 14.4987C3.33203 15.6953 4.30208 16.6654 5.4987 16.6654Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33203 7.33203C6.4366 7.33203 7.33203 6.4366 7.33203 5.33203C7.33203 4.22746 6.4366 3.33203 5.33203 3.33203C4.22746 3.33203 3.33203 4.22746 3.33203 5.33203C3.33203 6.4366 4.22746 7.33203 5.33203 7.33203Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.668 7.33203C15.7725 7.33203 16.668 6.4366 16.668 5.33203C16.668 4.22746 15.7725 3.33203 14.668 3.33203C13.5634 3.33203 12.668 4.22746 12.668 5.33203C12.668 6.4366 13.5634 7.33203 14.668 7.33203Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.41797 12.0019C5.71797 10.8353 6.78463 9.96859 8.04463 9.97526L10.3313 9.98193C12.078 9.9886 13.5646 8.86859 14.1113 7.30859"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

// Provider component to manage course data
export function CourseDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [courseData, setCourseData] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);

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

  const value = useMemo(
    () => ({
      courseData,
      loading,
      setCourseData: (data: CourseType) => {
        setCourseData(data);
        setLoading(false);

        // Cache in localStorage for persistence across refreshes
        try {
          localStorage.setItem('courseData', JSON.stringify(data));
        } catch (e) {
          console.error('Failed to cache course data:', e);
        }
      },
      getHierarchy,
    }),
    [courseData, loading, getHierarchy]
  );

  // Try to load from localStorage on initial mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('courseData');
      if (cached) {
        console.log('Uncaching course data', cached);
        setCourseData(JSON.parse(cached));
      }
    } catch (e) {
      console.error('Failed to load cached course data:', e);
    }
    setLoading(false);
  }, []);

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}

// Hook to use course data
export function useCourseData() {
  return useContext(CourseContext);
}

// Update the fetchCourseData function to determine courseId from lessonId first
async function fetchCourseData(lessonId: string): Promise<CourseType> {
  // First, get the course ID from the lesson ID
  const courseIdResponse = await fetch(`/api/lessons/${lessonId}/course`, {
    next: { tags: ['lesson-hierarchy'] },
  });

  if (!courseIdResponse.ok) {
    throw new Error('Failed to determine course ID from lesson');
  }

  const { courseId, hierarchy } = await courseIdResponse.json();

  // Then, fetch the course data using that ID
  const courseResponse = await fetch(`/api/courses/${courseId}`, {
    next: { tags: ['course-data'], revalidate: 3600 },
  });

  if (!courseResponse.ok) {
    throw new Error('Failed to fetch course data');
  }

  const courseData = await courseResponse.json();

  // Store the hierarchy information for the current lesson
  localStorage.setItem(
    `lesson-hierarchy-${lessonId}`,
    JSON.stringify(hierarchy)
  );

  return courseData;
}

// Main component for course sections sidebar
export function CourseSections({ lessonId }: { lessonId: string }) {
  const { courseData, loading, setCourseData, getHierarchy } = useCourseData();
  const pathname = usePathname();
  const [activeLessonId, setActiveLessonId] = useState(lessonId);
  const [isLoading, setIsLoading] = useState(false);

  // Update active lesson ID when URL changes
  useEffect(() => {
    setActiveLessonId(lessonId);
  }, [lessonId]);

  // Load course data if needed
  useEffect(() => {
    if (!loading && !courseData) {
      setIsLoading(true);
      fetchCourseData(lessonId)
        .then((data) => {
          setCourseData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error loading course data:', err);
          setIsLoading(false);
        });
    }
  }, [courseData, loading, lessonId, setCourseData]);

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
        {courseData.sections.map((section) => (
          <CourseSection
            key={section.id}
            title={section.title}
            status={section.status}
            modules={
              section.modules.map((module) => ({
                title: module.title,
                icon: module.icon || <CodeIcon />,
                progress: module.progress,
                total: module.total,
                status: module.status,
                lessons: module.lessons.map((lesson) => ({
                  id: lesson.id,
                  title: lesson.title,
                  status: lesson.status,
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
