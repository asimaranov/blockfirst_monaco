import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { documentId, tags = [] } = await request.json();

    if (!documentId && !tags.length) {
      return NextResponse.json(
        { error: 'Either documentId or tags must be provided' },
        { status: 400 }
      );
    }

    const revalidatedTags = [];

    // If documentId is provided, revalidate all document-related cache tags
    if (documentId) {
      // Revalidate document by ID
      revalidateTag(`document-by-id`, 'max');
      revalidateTag(`document-by-id:${documentId}`, 'max');
      revalidatedTags.push('document-by-id');

      // Revalidate course ID cache
      revalidateTag(`course-id`, 'max');
      revalidateTag(`course-id:${documentId}`, 'max');
      revalidatedTags.push('course-id');

      // Revalidate children documents
      revalidateTag(`children-by-document-id`, 'max');
      revalidateTag(`children-by-document-id:${documentId}`, 'max');
      revalidatedTags.push('children-by-document-id');

      // Also revalidate course-info cache if relevant
      revalidateTag(`course-info`, 'max');
      revalidateTag(`course-info:${documentId}`, 'max');
      revalidatedTags.push('course-info');
    }

    // Allow revalidating specific tags if needed
    if (tags.length > 0) {
      for (const tag of tags) {
        revalidateTag(tag, 'max');
        revalidatedTags.push(tag);
      }
    }

    return NextResponse.json({
      revalidated: true,
      documentId,
      revalidatedTags,
    });
  } catch (error) {
    console.error('Error revalidating cache:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate cache' },
      { status: 500 }
    );
  }
}
