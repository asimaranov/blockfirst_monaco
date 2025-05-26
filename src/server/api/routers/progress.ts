import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';
import {
  UserTaskProgress,
  UserLessonProgress,
  UserCourseProgress,
} from '~/server/models/UserProgress';
import { getDocumentChildren } from '~/lib/documents';

export const progressRouter = createTRPCRouter({
  // Get progress for a specific task
  getTaskProgress: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { taskId } = input;

      const progress = await UserTaskProgress.findOne({
        userId,
        taskId,
      });

      return (
        progress || {
          userId,
          taskId,
          status: 'available',
          advancedTasksSolved: false,
          submissionCount: 0,
        }
      );
    }),

  // Get progress for a specific lesson
  getLessonProgress: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { lessonId } = input;

      const progress = await UserLessonProgress.findOne({
        userId,
        lessonId,
      });

      return (
        progress || {
          userId,
          lessonId,
          status: 'available',
          completedTasksCount: 0,
          totalTasksCount: 0,
          completedAdvancedTasksCount: 0,
          totalAdvancedTasksCount: 0,
        }
      );
    }),

  // Get progress for a specific lesson
  getLessonsProgress: publicProcedure
    .input(z.object({ lessonIds: z.array(z.string()) }))
    .query(async ({ input, ctx }) => {
      if (!ctx.session) {
        return [];
      }
      
      const userId = ctx.session.user.id;
      const { lessonIds } = input;

      const progress = await UserLessonProgress.find({
        userId,
        lessonId: { $in: lessonIds },
      });

      return progress;
    }),

  getCourseProgress: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { courseId } = input;

      const progress = await UserCourseProgress.findOne({
        userId,
        courseId,
      });

      return progress;
    }),

  getCoursesProgress: protectedProcedure
  .input(z.object({ courseIds: z.array(z.string()) }))
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { courseIds } = input;

    const progress = await UserCourseProgress.find({
      userId,
      courseId: { $in: courseIds },
    });

    return progress;
  }),
  markLessonAsInProgress: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { lessonId } = input;

      // if not exists, create it
      const lessonProgress = await UserLessonProgress.findOne({
        userId,
        lessonId,
      });
      if (!lessonProgress) {
        await UserLessonProgress.create({
          userId,
          lessonId,
          status: 'in-progress',
        });
      }
    }),
});
