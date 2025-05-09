// \'use server\'; // Removed this line
import React from 'react';
import Cover from './Cover'; // Import the extracted Cover component

import PlateEditor from './PlateEditor';
import RightSidebar from './RightSidebar';
import { PlateController } from '@udecode/plate/react';
import ContentFooter from './ContentFooter';
import CommentsSection from './CommentsSection';
import Footer from '../Footer';
import prisma from '@/lib/prisma';
import { Value } from '@udecode/plate';
import { authClient } from '~/server/auth/client';
import { redirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import superjson from 'superjson';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';

// Helper function to create cached functions with proper serialization
const createCachedFunction = <T, P extends unknown[]>(
  fn: (...params: P) => Promise<T>,
  keyParts: string[],
  options?: { tags?: string[]; revalidate?: number | false }
) => {
  const wrap = async (...params: P): Promise<string> => {
    const result = await fn(...params);
    return superjson.stringify(result);
  };

  const cachedFn = unstable_cache(wrap, keyParts, options);

  return async (...params: P): Promise<T> => {
    const result = await cachedFn(...params);
    return superjson.parse(result);
  };
};

// Cached database queries
const getDocument = async (lessonId: string) => {
  'use cache';

  const document = await prisma.document.findUnique({
    where: {
      id: lessonId,
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
    },
  });

  cacheTag('document-by-id', lessonId);

  console.log('documenttttlsjknflkjn', document);
  return document;
};

const getParentDocument = createCachedFunction(
  async (parentDocumentId: string) => {
    return prisma.document.findUnique({
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
  },
  ['parent-document-with-children'],
  { tags: ['document', 'document-children'] }
);

const getChildrenByDocId = createCachedFunction(
  async (documentId: string) => {
    return prisma.document.findMany({
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
  },
  ['children-by-document-id'],
  { tags: ['document', 'document-children'] }
);

const CodeIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M8.0026 16.6673H12.0026C15.3359 16.6673 16.6693 15.334 16.6693 12.0007V8.00065C16.6693 4.66732 15.3359 3.33398 12.0026 3.33398H8.0026C4.66927 3.33398 3.33594 4.66732 3.33594 8.00065V12.0007C3.33594 15.334 4.66927 16.6673 8.0026 16.6673Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.39875 7.97852L6.73875 9.63852C6.54542 9.83185 6.54542 10.1585 6.73875 10.3518L8.39875 12.0118"
          stroke="#9AA6B5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.5977 7.97852L13.2577 9.63852C13.451 9.83185 13.451 10.1585 13.2577 10.3518L11.5977 12.0118"
          stroke="#9AA6B5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

const MultiSigIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M5.33203 11.9987V7.33203"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.4987 16.6654C6.69531 16.6654 7.66536 15.6953 7.66536 14.4987C7.66536 13.3021 6.69531 12.332 5.4987 12.332C4.30208 12.332 3.33203 13.3021 3.33203 14.4987C3.33203 15.6953 4.30208 16.6654 5.4987 16.6654Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33203 7.33203C6.4366 7.33203 7.33203 6.4366 7.33203 5.33203C7.33203 4.22746 6.4366 3.33203 5.33203 3.33203C4.22746 3.33203 3.33203 4.22746 3.33203 5.33203C3.33203 6.4366 4.22746 7.33203 5.33203 7.33203Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.668 7.33203C15.7725 7.33203 16.668 6.4366 16.668 5.33203C16.668 4.22746 15.7725 3.33203 14.668 3.33203C13.5634 3.33203 12.668 4.22746 12.668 5.33203C12.668 6.4366 13.5634 7.33203 14.668 7.33203Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.41797 12.0019C5.71797 10.8353 6.78463 9.96859 8.04463 9.97526L10.3313 9.98193C12.078 9.9886 13.5646 8.86859 14.1113 7.30859"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

export default async function LessonPage({ lessonId }: { lessonId: string }) {
  const document = await getDocument(lessonId);

  // const session = await authClient.getSession();
  console.log('documentttt id', lessonId);
  console.log('documentttt', document?.contentRich);

  let prevLessonId: string | null = null;
  let nextLessonId: string | null = null;

  if (document?.parentDocumentId) {
    const parentDocument = await getParentDocument(document.parentDocumentId);

    if (parentDocument) {
      const siblings = parentDocument.children.filter(
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

          const moduleIndex = grandparentDocument.children.findIndex(
            (child) => child.id === parentDocument.id
          );

          // Check if there is a next module
          if (
            moduleIndex >= 0 &&
            moduleIndex < grandparentDocument.children.length - 1
          ) {
            const nextModule = (await getChildrenByDocId(
              grandparentDocument.children[moduleIndex + 1]!.id
            ))!;

            // Get the first lesson of the next module
            if (nextModule.length > 0) {
              nextLessonId = nextModule[0].id;
            }
          }
        }
      }

      console.log('prevLessonId', prevLessonId);
      console.log('nextLessonId', nextLessonId);
    }
  }

  return (
    <div>
      <Cover />
      <div className="border-accent flex min-h-screen flex-row border-x">
        <div className="w-full flex-1 sm:w-238">
          <div className="px-5 sm:px-16">
            <PlateEditor richText={document?.contentRich as Value} />
          </div>
          <ContentFooter
            nextLocked={false}
            nextLessonId={nextLessonId}
            prevLessonId={prevLessonId}
          />
          <CommentsSection lessonId={lessonId} />
        </div>
        <RightSidebar />
      </div>
      <Footer className="border-accent border-x border-t" />
    </div>
  );
}
