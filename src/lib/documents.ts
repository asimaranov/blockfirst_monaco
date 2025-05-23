import prisma from '~/lib/prisma';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';

/**
 * Get a document by its ID
 */
export async function getDocumentById(id: string) {
  'use cache';
  cacheTag('document-by-id', id);
  cacheTag(`document-by-id:${id}`);
  return prisma.document.findUnique({
    where: { id },
  });
}

export const getPrevNextLessonIds = async (lessonId: string) => {
  'use cache';

  cacheTag('prev-next-lesson-ids', lessonId);

  const document = await getDocumentById(lessonId);

  let prevLessonId: string | null = null;
  let nextLessonId: string | null = null;

  if (document?.parentDocumentId) {
    const parentDocument = await getParentDocument(document.parentDocumentId);

    if (parentDocument) {
      const parentDocumentChildren = await getDocumentChildren(parentDocument.id);
      const siblings = parentDocumentChildren.filter(
        (sibling) => sibling.isArchived === false
      );
      const currentIndex = siblings.findIndex(
        (sibling) => sibling.id === lessonId
      );

      if (currentIndex > 0) {
        prevLessonId = siblings[currentIndex - 1].id;
      }

      if (currentIndex < siblings.length - 1) {
        nextLessonId = siblings[currentIndex + 1].id;
      } else {
        // If this is the last lesson in the module, try to find the next module and its first lesson
        if (parentDocument.parentDocumentId) {
          const grandparentDocument = (await getParentDocument(
            parentDocument.parentDocumentId
          ))!;

          const grandparentDocumentChildren = await getDocumentChildren(grandparentDocument.id);

          const moduleIndex = grandparentDocumentChildren.findIndex(
            (child) => child.id === parentDocument.id
          );

          // Check if there is a next module
          if (
            moduleIndex >= 0 &&
            moduleIndex < grandparentDocumentChildren.length - 1
          ) {
            const nextModule = (await getDocumentChildren(
              grandparentDocumentChildren[moduleIndex + 1]!.id
            ))!;

            // Get the first lesson of the next module
            if (nextModule.length > 0) {
              nextLessonId = nextModule[0].id;
            }
          }
        }
      }
    }
  }

  return { prevLessonId, lessonDocument: document, nextLessonId };
};

const getParentDocument = async (parentDocumentId: string) => {
  'use cache';

  cacheTag('parent-document-by-id', parentDocumentId);

  return await prisma.document.findUnique({
    where: {
      id: parentDocumentId,
      isArchived: false,
    },
    include: {
      children: {
        where: {
          isArchived: false,
        },
        orderBy: [
          {
            sortOrder: 'asc',
          },
          {
            createdAt: 'asc',
          },
        ],
      },
      parentDocument: {
        include: {
          children: {
            where: {
              isArchived: false,
            },
            orderBy: [
              {
                sortOrder: 'asc',
              },
              {
                createdAt: 'asc',
              },
            ],
            include: {
              children: {
                where: {
                  isArchived: false,
                },
                orderBy: [
                  {
                    sortOrder: 'asc',
                  },
                  {
                    createdAt: 'asc',
                  },
                ],
              },
            },
          },
        },
      },
    },
  });
};

export const getDocumentChildren = async (documentId: string) => {
  'use cache';

  cacheTag('children-by-document-id', documentId);

  return await prisma.document.findMany({
    where: {
      parentDocumentId: documentId,
      isArchived: false,
    },
    orderBy: [
      {
        sortOrder: 'asc',
      },
      {
        createdAt: 'asc',
      },
    ],
  });
};

/**
 * Get course IDs from a lesson ID by traversing the document hierarchy
 */
export const getCourseById = async (lessonId: string) => {
  'use cache';
  cacheTag('course-id', lessonId);
  cacheTag(`course-id:${lessonId}`);
  const lessonDocument = await getDocumentById(lessonId);

  // Get module
  const moduleDocument = await getDocumentById(
    lessonDocument!.parentDocumentId!
  );

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

export const getCourseInfo = async (courseId: string) => {
  'use cache';
  cacheTag('course-info', courseId);
  const courseSections = await getDocumentChildren(courseId);
  const documentsMap: any = {};

  const sections = await Promise.all(
    courseSections.map(async (section) => {
      // Add section to map
      documentsMap[section.id] = {
        id: section.id,
        type: 'section',
        parentId: courseId,
        title: section.title || '',
      };

      const modules = await getDocumentChildren(section.id);

      const modulesWithLessons = await Promise.all(
        modules.map(async (module) => {
          // Add module to map
          documentsMap[module.id] = {
            id: module.id,
            type: 'module',
            parentId: section.id,
            title: module.title || '',
          };

          const lessons = await getDocumentChildren(module.id);

          // Add all lessons to map
          lessons.forEach((lesson) => {
            documentsMap[lesson.id] = {
              id: lesson.id,
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



/**
 * Utility function to revalidate document cache
 * Can be called from server components or server actions
 */
export async function revalidateDocumentCache(documentId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/cache/revalidate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documentId }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('Failed to revalidate cache:', error);
    throw new Error('Failed to revalidate document cache');
  }

  return response.json();
}
