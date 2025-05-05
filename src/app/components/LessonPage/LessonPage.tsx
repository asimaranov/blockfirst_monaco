'use server';
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

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const document = await prisma.document.findUnique({
    where: {
      id: courseId,
    },
  });

  const session = await authClient.getSession();

  return (
    <div>
      <Cover />
      <div className="border-accent flex min-h-screen flex-row border-x">
        <div className="w-full sm:w-238 flex-1">
          <div className="px-5 sm:px-16">
            <PlateEditor richText={document?.contentRich as Value} />
          </div>
          <ContentFooter nextLocked={true} />
          <CommentsSection lessonId={courseId} />
        </div>
        <RightSidebar />
      </div>
      <Footer className="border-accent border-x border-t" />
    </div>
  );
}
