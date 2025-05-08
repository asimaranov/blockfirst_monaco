import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import prisma from '~/lib/prisma';
import { slugify } from 'transliteration';

declare global {
  var lessonToCourseMap: Map<{
    courseSlug: string;
    nameSlug: string;
  }, {
    courseId: string;
    ids: {
      sectionId: string;
      topicId: string;
      lessonId: string;
    };
    names: {
      sectionName: string;
      topicName: string;
      lessonName: string;
    };
  }> | undefined;
}

let cached: Map<{
  courseSlug: string;
  nameSlug: string;
}, {
  courseId: string;
  ids: {
    sectionId: string;
    topicId: string;
    lessonId: string;
  };
  names: {
    sectionName: string;
    topicName: string;
    lessonName: string;
  };
}> | undefined;



const getLessonInfo = async (lessonId: string) => {
  const lesson = await prisma.document.findUnique({
    where: {
      id: lessonId,
    },
  });
};

export const parseAndMemoizeCourseInfo = cache(async (courseId: string) => {
  'use server';
  try {
    const lessonToCourseMap = new Map<
      {
        courseSlug: string;
        nameSlug: string;
      },
      {
        courseId: string;
        ids: {
          sectionId: string;
          topicId: string;
          lessonId: string;
        };
        names: {
          sectionName: string;
          topicName: string;
          lessonName: string;
        };
      }
    >();

    const course = await prisma.document.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    const sections = await prisma.document.findMany({
      where: {
        parentDocumentId: courseId,
      },
    });

    for (const section of sections) {
      const topics = await prisma.document.findMany({
        where: {
          parentDocumentId: section.id,
        },
      });

      for (const topic of topics) {
        const lessons = await prisma.document.findMany({
          where: {
            parentDocumentId: topic.id,
          },
        });

        for (const lesson of lessons) {
          lessonToCourseMap.set(
            {
              courseSlug: slugify(course.title ?? ''),
              nameSlug: slugify(lesson.title ?? ''),
            },
            {
              courseId,
              ids: {
                sectionId: section.id,
              topicId: topic.id,
              lessonId: lesson.id,
            },
            names: {
              sectionName: section.title ?? '',
              topicName: topic.title ?? '',
              lessonName: lesson.title ?? '',
            },
          });
        }
      }
    }

    return lessonToCourseMap;
  } catch (error) {
    console.error(error);
    redirect('/signin');
    return null;
  }
});

// export { auth };
// export type Session = typeof auth.$Infer.Session;
// export type AuthUserType = Session['user'];
