export interface CourseStat {
  type: 'lessons' | 'tests' | 'lectures';
  label: string;
  icon: React.ReactNode;
}

export default function CourseStatItem ({ stat }: { stat: CourseStat & { value: string } }) {
  return (
    <div className="flex-1 px-5 py-5 sm:px-8">
      <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
        <div className="flex flex-row items-center gap-3">
          {stat.icon}
          <span className="text-3xl font-medium text-gray-100 sm:text-2xl">
            {stat.value}
          </span>
        </div>
        <span className="text-secondary ml-auto text-xs sm:ml-0">
          {stat.label}
        </span>
      </div>
    </div>
  );
};
