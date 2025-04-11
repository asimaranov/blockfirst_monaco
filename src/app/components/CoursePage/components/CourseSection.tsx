import { CourseStructure } from "~/app/lib/constants/courses";
import CourseBadge from "./CourseBadge";
// Component for course section
export default function CourseSection ({
  section,
}: {
  section: CourseStructure;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex cursor-pointer items-center justify-between bg-[#14171C] px-5 py-3 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#01050D]">
            <span className="text-xs text-gray-100">{section.id}</span>
          </div>
          <span className="text-sm sm:text-base">{section.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <CourseBadge badgeType="available" />
        </div>
      </div>
      {section.lessons && (
        <div className="flex flex-col gap-4 px-5 pt-5 sm:px-8">
          {section.lessons.map((lesson, lessonIndex) => (
            <div key={lessonIndex} className="flex gap-1">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-[#9AA6B5] opacity-50" />
              </div>
              <span className="text-sm text-gray-100">
                {lesson.split(' – ')[0]}{' '}
                {lesson.split(' – ')[1] && (
                  <span className="text-secondary">
                    {' '}
                    – {lesson.split(' – ')[1]}
                  </span>
                )}{' '}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};