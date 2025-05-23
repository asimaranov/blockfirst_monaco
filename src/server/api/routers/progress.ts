import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';
import {
  UserTaskProgress,
  UserLessonProgress,
  UserModuleProgress,
  UserSectionProgress,
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

  // Get progress for a course and all its children
  getCourseProgress: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { courseId } = input;

      // Get course progress
      const courseProgress = await UserCourseProgress.findOne({
        userId,
        courseId,
      });

      // Get all sections in the course
      const sections = await getDocumentChildren(courseId);
      const sectionIds = sections.map((section) => section.id);

      // Get progress for these sections
      const sectionProgressRecords = await UserSectionProgress.find({
        userId,
        sectionId: { $in: sectionIds },
      });

      // Create a map of section progress by section ID
      const sectionProgressMap = sectionProgressRecords.reduce(
        (map, record) => {
          map[record.sectionId] = record;
          return map;
        },
        {} as Record<string, any>
      );

      // Get modules for each section
      const modulePromises = sectionIds.map((sectionId) =>
        getDocumentChildren(sectionId)
      );
      const modulesArrays = await Promise.all(modulePromises);

      // Flatten modules array and get module IDs
      const modules = modulesArrays.flat();
      const moduleIds = modules.map((module) => module.id);

      // Get progress for these modules
      const moduleProgressRecords = await UserModuleProgress.find({
        userId,
        moduleId: { $in: moduleIds },
      });

      // Create a map of module progress by module ID
      const moduleProgressMap = moduleProgressRecords.reduce(
        (map, record) => {
          map[record.moduleId] = record;
          return map;
        },
        {} as Record<string, any>
      );

      // Prepare the response
      return {
        course: courseProgress || {
          userId,
          courseId,
          status: 'available',
          completedSectionsCount: 0,
          totalSectionsCount: sections.length,
          completedLessonsCount: 0,
          totalLessonsCount: 0,
        },
        sections: sections.map((section) => {
          const progress = sectionProgressMap[section.id];

          // Get modules for this section
          const sectionModules = modules.filter(
            (module) => module.parentDocumentId === section.id
          );

          return {
            sectionId: section.id,
            title: section.title,
            userId,
            status: progress?.status || 'available',
            finalTestStatus: progress?.finalTestStatus || 'locked',
            completedModulesCount: progress?.completedModulesCount || 0,
            totalModulesCount: sectionModules.length,
            completedAt: progress?.completedAt,
            modules: sectionModules.map((module) => {
              const moduleProgress = moduleProgressMap[module.id];
              return {
                moduleId: module.id,
                title: module.title,
                userId,
                status: moduleProgress?.status || 'available',
                completedLessonsCount:
                  moduleProgress?.completedLessonsCount || 0,
                totalLessonsCount: moduleProgress?.totalLessonsCount || 0,
                completedAt: moduleProgress?.completedAt,
              };
            }),
          };
        }),
      };
    }),
});
