'use client';

import { useState } from 'react';
import { CourseModule } from './CourseModule';
import { CourseBadge } from '../shared/CourseBadge';
import CourseStatusBadge from '../shared/CourseStatusBadge';
import { CircularProgressBar } from '../shared/CircularProgressBar';
import CourseStatusBadgeBg from '../shared/CourseStatusBadgeBg';
import { TakeTestButton } from './TakeTestButton';
import ToggleMinus from '../shared/ToggleMinus/ToggleMinus';
import { motion, AnimatePresence } from 'motion/react';

interface CourseSectionProps {
  title: string;
  status: 'available' | 'upcoming' | 'locked' | 'completed';
  modules: {
    title: string;
    icon: React.ReactNode;
    lessons: {
      title: string;
      status?: 'available' | 'skipped' | 'completed' | 'completedNoExtra';
    }[];
    progress: number;
    total: number;
    status: 'available' | 'upcoming' | 'locked';
  }[];
  finalTestStatus: 'locked' | 'available' | 'completed';
  expanded?: boolean;
}

export function CourseSection({
  title,
  status,
  modules,
  finalTestStatus,
  expanded = true,
}: CourseSectionProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  // Calculate overall section progress
  let totalLessons = 0;
  let completedLessons = 0;
  modules.forEach((module) => {
    totalLessons += module.lessons.length;
    completedLessons += module.lessons.filter(
      (lesson) => lesson.status === 'completed'
    ).length;
  });
  const sectionProgress =
    totalLessons > 0 ? completedLessons / totalLessons : 0;

  return (
    <div className="mt-12 mb-8 flex w-full flex-col space-y-8 px-4">
      <div className="w-full px-4">
        <div className="mb-4 flex items-center justify-between">
          {/* Available indicator */}
          {/* <CourseBadge isAvailable={isAvailable} /> */}
          <CourseStatusBadgeBg
            badgeType={
              status === 'available'
                ? 'available'
                : status === 'upcoming'
                  ? 'upcoming'
                  : status === 'completed'
                    ? 'completed'
                    : 'starter'
            }
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {status === 'available' && (
                <CircularProgressBar
                  progress={sectionProgress}
                  className="h-5 w-5"
                />
              )}
              {(status === 'locked' || status === 'upcoming') && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M10.0037 14.0114C10.6789 14.0114 11.2262 13.4641 11.2262 12.7889C11.2262 12.1137 10.6789 11.5664 10.0037 11.5664C9.32858 11.5664 8.78125 12.1137 8.78125 12.7889C8.78125 13.4641 9.32858 14.0114 10.0037 14.0114Z"
                    fill="#9AA6B5"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M14.7061 8.1475V7.21C14.7061 5.185 14.2186 2.5 9.99609 2.5C5.77359 2.5 5.28609 5.185 5.28609 7.21V8.1475C3.18609 8.41 2.49609 9.475 2.49609 12.0925V13.4875C2.49609 16.5625 3.43359 17.5 6.50859 17.5H13.4836C16.5586 17.5 17.4961 16.5625 17.4961 13.4875V12.0925C17.4961 9.475 16.8061 8.41 14.7061 8.1475ZM9.99609 15.055C8.74359 15.055 7.73109 14.035 7.73109 12.79C7.73109 11.5375 8.75109 10.525 9.99609 10.525C11.2411 10.525 12.2611 11.545 12.2611 12.79C12.2611 14.0425 11.2486 15.055 9.99609 15.055ZM6.50859 8.08C6.44859 8.08 6.39609 8.08 6.33609 8.08V7.21C6.33609 5.0125 6.95859 3.55 9.99609 3.55C13.0336 3.55 13.6561 5.0125 13.6561 7.21V8.0875C13.5961 8.0875 13.5436 8.0875 13.4836 8.0875H6.50859V8.08Z"
                    fill="#9AA6B5"
                    fill-opacity="0.5"
                  />
                </svg>
              )}
              {status === 'completed' && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                    fill="#195AF4"
                  />
                  <path
                    d="M6.625 10.2104L8.73396 12.3194L13.3737 7.67969"
                    stroke="#F2F2F2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>

            <span className="text-sm text-white">{title}</span>
          </div>
          {/* Toggle expand/collapse */}
          <ToggleMinus
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            disabled={status === 'locked' || status === 'upcoming'}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && status !== 'locked' && status !== 'upcoming' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-8">
              {modules.map((module, idx) => (
                <CourseModule
                  key={idx}
                  title={module.title}
                  icon={module.icon}
                  lessons={module.lessons}
                  progress={module.progress}
                  status={module.status}
                  total={module.lessons.length}
                />
              ))}
              <div className="mt-auto px-4 py-4">
                <TakeTestButton
                  onClick={() => {}}
                  isCompleted={finalTestStatus === 'completed'}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
