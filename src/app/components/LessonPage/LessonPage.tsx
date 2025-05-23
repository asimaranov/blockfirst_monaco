// \'use server\'; // Removed this line
import React from 'react';
import Cover from './Cover'; // Import the extracted Cover component

import PlateEditor from './PlateEditor';
import RightSidebar from './RightSidebar';
import ContentFooter from './ContentFooter';
import CommentsSection from './CommentsSection';
import Footer from '../Footer';
import prisma from '@/lib/prisma';
import { Value } from '@udecode/plate';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';


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

  // console.log('documenttttlsjknflkjn', document);
  return document;
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

const getChildrenByDocId = async (documentId: string) => {
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

export default async function LessonPage({ lessonId }: { lessonId: string }) {
  const document = await getDocument(lessonId);

  // console.log('documentttt id', lessonId);
  // console.log('documentttt', document?.contentRich);

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

      // console.log('prevLessonId', prevLessonId);
      // console.log('nextLessonId', nextLessonId);
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
