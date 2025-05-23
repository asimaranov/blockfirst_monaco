import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';
import {
  UserTaskProgress,
  UserLessonProgress,
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
  getLessonsProgress: protectedProcedure
  .input(z.object({ lessonIds: z.array(z.string()) }))
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { lessonIds } = input;

    const progress = await UserLessonProgress.find({
      userId,
      lessonId: { $in: lessonIds },
    });

    return progress;
  }),
  // Get progress for all lessons in a module
  getModuleLessonsProgress: protectedProcedure
    .input(z.object({ moduleId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { moduleId } = input;

      // Get all lessons in the module
      const lessons = await getDocumentChildren(moduleId);

      if (!lessons.length) {
        return [];
      }

      const lessonIds = lessons.map((lesson) => lesson.id);

      // Get progress for these lessons
      const progressRecords = await UserLessonProgress.find({
        userId,
        lessonId: { $in: lessonIds },
      });

      // Create a map of lesson progress by lesson ID
      const progressMap = progressRecords.reduce(
        (map, record) => {
          map[record.lessonId] = record;
          return map;
        },
        {} as Record<string, any>
      );

      // Return progress for each lesson, using default values if no progress exists
      return lessons.map((lesson) => {
        const progress = progressMap[lesson.id];
        return {
          lessonId: lesson.id,
          title: lesson.title,
          userId,
          status: progress?.status || 'available',
          completedTasksCount: progress?.completedTasksCount || 0,
          totalTasksCount: progress?.totalTasksCount || 0,
          completedAdvancedTasksCount:
            progress?.completedAdvancedTasksCount || 0,
          totalAdvancedTasksCount: progress?.totalAdvancedTasksCount || 0,
          completedAt: progress?.completedAt,
        };
      });
    }),


    markLessonAsInProgress: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { lessonId } = input;

      // if not exists, create it
      const lessonProgress = await UserLessonProgress.findOne({ userId, lessonId });
      if (!lessonProgress) {
        await UserLessonProgress.create({ userId, lessonId, status: 'in-progress' });
      }
    }),
});
