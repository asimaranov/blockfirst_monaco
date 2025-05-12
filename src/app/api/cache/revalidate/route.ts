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
      revalidateTag(`document-by-id`);
      revalidateTag(`document-by-id:${documentId}`);
      revalidatedTags.push('document-by-id');

      // Revalidate course ID cache
      revalidateTag(`course-id`);
      revalidateTag(`course-id:${documentId}`);
      revalidatedTags.push('course-id');

      // Revalidate children documents
      revalidateTag(`children-by-document-id`);
      revalidateTag(`children-by-document-id:${documentId}`);
      revalidatedTags.push('children-by-document-id');

      // Also revalidate course-info cache if relevant
      revalidateTag(`course-info`);
      revalidateTag(`course-info:${documentId}`);
      revalidatedTags.push('course-info');
    }

    // Allow revalidating specific tags if needed
    if (tags.length > 0) {
      for (const tag of tags) {
        revalidateTag(tag);
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
