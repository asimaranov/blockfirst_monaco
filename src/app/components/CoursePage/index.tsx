'use client';

import { useState } from 'react';
import { Topbar } from './Topbar';
import { COURSES, ICourse } from '~/app/lib/constants/courses';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseInfoTopCard } from '~/app/components/CourseInfoTopCard';
import { CourseCard } from '~/app/components/CourseCard/CourseCard';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';

export default function CoursePage({
  session,
  courseId,
}: {
  session: Session;
  courseId: string;
}) {
  const course = COURSES.find((x) => x.id === courseId)!;

  return (
    <main className="border-accent border-r border-l">
      <Topbar
        courseAuthor={course?.info?.author.name ?? ''}
        courseAuthorAvatar={course?.info?.author.image ?? ''}
      />
      <div className="grid grid-cols-2 gap-8">
        <CourseInfoTopCard course={course} />
        <div>
          aaa
        </div>
      </div>

      <Footer />
    </main>
  );
}
