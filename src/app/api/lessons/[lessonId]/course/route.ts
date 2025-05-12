import { NextResponse } from 'next/server';
import { getDocumentById } from '~/lib/documents';

// API route to get course ID from lesson ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params;

  try {
    // Traverse the document hierarchy to find the course ID
    const lessonDocument = await getDocumentById(lessonId);
    if (!lessonDocument?.parentDocumentId) {
      return NextResponse.json(
        { error: 'Lesson not found or has no parent' },
        { status: 404 }
      );
    }

    // Get module
    const moduleDocument = await getDocumentById(
      lessonDocument.parentDocumentId
    );
    if (!moduleDocument?.parentDocumentId) {
      return NextResponse.json(
        { error: 'Module not found or has no parent' },
        { status: 404 }
      );
    }

    // Get section
    const sectionDocument = await getDocumentById(
      moduleDocument.parentDocumentId
    );
    if (!sectionDocument?.parentDocumentId) {
      return NextResponse.json(
        { error: 'Section not found or has no parent' },
        { status: 404 }
      );
    }

    // Return course ID and hierarchy information
    return NextResponse.json({
      courseId: sectionDocument.parentDocumentId,
      hierarchy: {
        lessonId,
        moduleId: lessonDocument.parentDocumentId,
        sectionId: moduleDocument.parentDocumentId,
        courseId: sectionDocument.parentDocumentId,
        lessonTitle: lessonDocument.title || '',
        moduleTitle: moduleDocument.title || '',
        sectionTitle: sectionDocument.title || '',
      },
    });
  } catch (error) {
    console.error('Error getting course ID:', error);
    return NextResponse.json(
      { error: 'Failed to determine course ID' },
      { status: 500 }
    );
  }
}
