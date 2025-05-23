import LessonSidebar from '~/app/components/LessonSidebar';
import MobileNavbar from '~/app/components/mobile/MobileNavbar';
import { api } from '~/trpc/server';
import { HydrateClient } from '~/trpc/server';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ExamComponent } from '~/app/components/ExamComponent';
import { NotificationsModal } from '~/app/components/Notifications/NotificationsModal';
import LessonPage from '~/app/components/LessonPage/LessonPage';
import {
  getDocumentById,
  getDocumentChildren,
  getCourseById,
  getCourseInfo,
} from '~/lib/documents';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';

export default async function Layout({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  // Prefetch notifications data
  // await api.notifications.getAll.prefetch();
  // await api.notifications.getUnreadCount.prefetch();
  // await api.userData.getUserData.prefetch();
  // await api.notifications.getSettings.prefetch();

  const getCourseByLessonId = await getCourseById(lessonId);

  const courseInfo = await getCourseInfo(getCourseByLessonId.courseId);

  return (
    <div className="bg-dark-bg relative flex max-h-screen flex-col sm:flex-row">
      <MobileNavbar />
      <ExamComponent />
      <LessonSidebar lessonId={lessonId} courseInfo={courseInfo} />
      <NotificationsModal />
      <Suspense>
        <div
          className="bg-dark-bg w-full overflow-visible px-0 sm:overflow-scroll"
          id="content-view"
        >
          <div className="px-0 sm:px-16">
            <LessonPage lessonId={lessonId} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
