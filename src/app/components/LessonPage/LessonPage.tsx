// \'use server\'; // Removed this line
import React from 'react';
import Cover from './Cover/Cover'; // Import the extracted Cover component

import PlateEditor from './PlateEditor';
import RightSidebar from './RightSidebar';
import ContentFooter from './ContentFooter';
import CommentsSection from './CommentsSection';
import Footer from '../Footer';
import { Value } from '@udecode/plate';
import { getPrevNextLessonIds } from '~/lib/documents';

export default async function LessonPage({
  lessonId,
  courseInfo,
  courseTitle,
  sectionTitle,
  moduleTitle,
  lessonTitle,
}: {
  lessonId: string;
  sectionTitle: string;
  courseInfo: any;
  moduleTitle: string;
  courseTitle: string;
  lessonTitle: string;
}) {
  const { nextLessonId, lessonDocument, prevLessonId } =
    await getPrevNextLessonIds(lessonId);

  return (
    <div>
      <Cover
        courseTitle={courseTitle}
        moduleTitle={moduleTitle}
        sectionTitle={sectionTitle}
        lessonTitle={lessonTitle}
        lessonId={lessonId}
        courseInfo={courseInfo}
      />
      <div className="border-accent flex min-h-screen flex-row sm:border-x">
        <div className="w-full flex-1 sm:w-238">
          <div className="px-5 sm:px-16">
            <PlateEditor richText={lessonDocument?.contentRich as Value} />
          </div>
          <ContentFooter
            lessonId={lessonId}
            nextLocked={false}
            nextLessonId={nextLessonId}
            prevLessonId={prevLessonId}
          />
          <CommentsSection lessonId={lessonId} />
        </div>
        <RightSidebar />
      </div>
      <Footer className="border-accent border-t sm:border-x" />
    </div>
  );
}
