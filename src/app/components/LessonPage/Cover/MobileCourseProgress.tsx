import { useCourseProgressStore } from "~/store/courseProgressStore";
import { CourseProgress } from "../../CourseInfoTopCard/CourseProgress";

export default function MobileCourseProgress() {
  const { courseProgress } = useCourseProgressStore();
  
  return (
    <>
      <CourseProgress
        progress={courseProgress}
        className="bg-[#0B0D12] px-8 py-5"
        progressClassName="h-2"
      />
    </>
  );
}
