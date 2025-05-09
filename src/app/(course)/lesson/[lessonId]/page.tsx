import LessonSidebar from '~/app/components/LessonSidebar';
import MobileNavbar from '~/app/components/mobile/MobileNavbar';
import { api } from '~/trpc/server';
import { HydrateClient } from '~/trpc/server';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation';
import { ExamComponent } from '~/app/components/ExamComponent';
import { NotificationsModal } from '~/app/components/Notifications/NotificationsModal';
import LessonPage from '~/app/components/LessonPage/LessonPage';
import prisma from '~/lib/prisma';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';

async function getDocumentChildren(parentId: string) {
  'use cache';
  cacheTag('children-by-document-id', parentId);
  return prisma.document.findMany({
    where: { parentDocumentId: parentId },
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'asc' }, // Fallback for documents without sortOrder
    ],
  });
}

async function getDocumentById(id: string) {
  'use cache';
  cacheTag('document-by-id', id);
  return prisma.document.findUnique({
    where: { id },
  });
}

const getCourseById = async (lessonId: string) => {
  'use cache';
  cacheTag('course-id', lessonId);
  const lessonDocument = await getDocumentById(lessonId);
  

  // Get module
  const moduleDocument = await getDocumentById(lessonDocument!.parentDocumentId!);
  

  // Get section
  const sectionDocument = await getDocumentById(
    moduleDocument!.parentDocumentId!
  );

  return {
    courseId: sectionDocument!.parentDocumentId!,
    sectionId: sectionDocument!.id,
    moduleId: moduleDocument!.id,
    lessonId: lessonDocument!.id,
  };
};

const getCourseInfo = async (courseId: string) => {
  'use cache';
  cacheTag('course-info', courseId);
  const courseSections = await getDocumentChildren(courseId);
  const documentsMap: any = {};

  const sections = await Promise.all(
    courseSections.map(async (section) => {
      // Add section to map
      documentsMap[section.id] = {
        type: 'section',
        parentId: courseId,
        title: section.title || '',
      };

      const modules = await getDocumentChildren(section.id);

      const modulesWithLessons = await Promise.all(
        modules.map(async (module) => {
          // Add module to map
          documentsMap[module.id] = {
            type: 'module',
            parentId: section.id,
            title: module.title || '',
          };

          const lessons = await getDocumentChildren(module.id);

          // Add all lessons to map
          lessons.forEach((lesson) => {
            documentsMap[lesson.id] = {
              type: 'lesson',
              parentId: module.id,
              title: lesson.title || '',
            };
          });

          return {
            id: module.id,
            title: module.title || '',
            icon: undefined,
            progress: 0,
            total: lessons.length,
            status: 'available',
            parentId: section.id,
            lessons: lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title || '',
              status: 'available',
              parentId: module.id,
            })),
          };
        })
      );

      return {
        id: section.id,
        title: section.title || '',
        icon: undefined,
        status: 'available',
        finalTestStatus: 'available',
        finalTestId: section.id,
        parentId: courseId,
        modules: modulesWithLessons,
      };
    })
  );

  return {
    id: courseId,
    sections,
    documentsMap,
  };
};

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
