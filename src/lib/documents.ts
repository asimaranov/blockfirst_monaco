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

/**
 * Get children documents of a parent document
 */
export async function getDocumentChildren(parentId: string) {
  'use cache';
  cacheTag('children-by-document-id', parentId);
  cacheTag(`children-by-document-id:${parentId}`);
  return prisma.document.findMany({
    where: { parentDocumentId: parentId },
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'asc' }, // Fallback for documents without sortOrder
    ],
  });
}

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
