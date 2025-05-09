import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '~/lib/prisma';

// Function to get document children
async function getDocumentChildren(parentId: string) {
  return prisma.document.findMany({
    where: { parentDocumentId: parentId },
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'asc' }, // Fallback for documents without sortOrder
    ],
  });
}

export async function GET(
  request: NextRequest
) {
  const courseId = request.nextUrl.searchParams.get('courseId') as string;

  try {
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

    return NextResponse.json({
      id: courseId,
      sections,
      documentsMap,
    });
  } catch (error) {
    console.error('Error fetching course data:', error);
    return NextResponse.json(
      { error: 'Failed to load course data' },
      { status: 500 }
    );
  }
}
