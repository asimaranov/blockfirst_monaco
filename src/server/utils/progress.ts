import {
  getCourseById,
  getDocumentChildren,
  getDocumentById,
  getCourseInfo,
} from '~/lib/documents';
import {
  UserTaskProgress,
  UserLessonProgress,
  UserCourseProgress,
} from '~/server/models/UserProgress';
import { getDocumentWithFields } from './document';
import { TElement } from '@udecode/plate';
import { api } from '~/trpc/server';

/**
 * Updates a task's status and propagates changes to parent lesson, module, section, and course
 */
export async function updateTaskStatus(
  userId: string,
  taskId: string,
  lessonId: string,
  status: 'available' | 'in-progress' | 'completed',
  advancedTasksSolved: boolean = false
) {
  // 1. Update or create user task progress
  const taskProgress = await UserTaskProgress.findOneAndUpdate(
    { userId, taskId },
    {
      status,
      advancedTasksSolved,
      completedAt: status === 'completed' ? new Date() : undefined,
      $inc: { submissionCount: 1 },
      lastSubmittedAt: new Date(),
    },
    { upsert: true, new: true }
  );

  // 3. Update lesson progress
  await updateLessonProgress(userId, lessonId);

  return taskProgress;
}

/**
 * Updates a lesson's status based on its tasks and propagates changes upward
 */
export async function updateLessonProgress(userId: string, lessonId: string) {
  // 1. Get all tasks in the lesson
  const { editor } = await getDocumentWithFields(lessonId, ['Title']);

  const tasks = editor.api.nodes<TElement>({
    at: [],
    match: (n) => n.type === 'task',
  });

  const taskIds = Array.from(tasks).flatMap((x) =>
    (x[0].children[0].text as string).split(',').map((id) => id.trim())
  );

  console.log('[taskIds] taskIds', taskIds);

  if (!taskIds.length) {
    console.log(`No tasks found for lesson ${lessonId}`);
    return null;
  }

  // // 2. Get progress for all tasks
  const taskProgressRecords = await UserTaskProgress.find({
    userId,
    taskId: { $in: taskIds },
  });

  console.log('[taskProgressRecords] taskProgressRecords', taskProgressRecords);

  // // 3. Calculate lesson progress
  const totalTasks = taskIds.length;
  const completedTasks = taskProgressRecords.filter(
    (record) => record.status === 'completed'
  ).length;
  const completedAdvancedTasks = taskProgressRecords.filter(
    (record) => record.status === 'completed' && record.advancedTasksSolved
  ).length;

  console.log('[completedTasks] completedTasks', completedTasks);
  console.log(
    '[completedAdvancedTasks] completedAdvancedTasks',
    completedAdvancedTasks
  );

  // // 4. Determine lesson status
  let status:
    | 'available'
    | 'in-progress'
    | 'completed'
    | 'completedNoExtra'
    | 'in-progress' = 'available';

  if (
    completedTasks === 0 &&
    taskProgressRecords.some((record) => record.status === 'in-progress')
  ) {
    status = 'in-progress';
  } else if (completedTasks === totalTasks) {
    if (completedAdvancedTasks === totalTasks) {
      status = 'completed';
    } else {
      status = 'completedNoExtra';
    }
  } else if (completedTasks > 0 && completedTasks < totalTasks) {
    status = 'in-progress';
  }

  // // 5. Update lesson progress
  const lessonProgress = await UserLessonProgress.findOneAndUpdate(
    { userId, lessonId },
    {
      status,
      completedTasksCount: completedTasks,
      totalTasksCount: totalTasks,
      completedAdvancedTasksCount: completedAdvancedTasks,
      totalAdvancedTasksCount: totalTasks, // Assuming all tasks have advanced versions
      completedAt:
        status === 'completed' || status === 'completedNoExtra'
          ? new Date()
          : undefined,
    },
    { upsert: true, new: true }
  );

  // // 6. Get lesson's parent hierarchy and update module progress
  const lesson = await getDocumentById(lessonId);
  if (!lesson || !lesson.parentDocumentId) {
    console.error(`Lesson ${lessonId} not found or has no parent`);
    return lessonProgress;
  }

  const moduleId = lesson.parentDocumentId;
  await updateCourseProgress(userId, lessonId);

  return lessonProgress;
}

/**
 * Updates a course's status based on its sections
 */
export async function updateCourseProgress(userId: string, lessonId: string) {
  const getCourseByLessonId = await getCourseById(lessonId);

  const courseData = await getCourseInfo(getCourseByLessonId.courseId);

  const lessons = Object.values(courseData.documentsMap).filter(
    (doc: any) => doc.type === 'lesson'
  );

  const progress = await UserLessonProgress.find({
    userId,
    lessonId: { $in: lessons.map((lesson) => (lesson as any).id) },
  });


  const completedLessons = progress.filter(
    (p: any) => p.status === 'completed'
  );

  if (progress) {
    const progressPercent = Math.round(
      (completedLessons!.length / lessons.length) * 100
    );

    await UserCourseProgress.findOneAndUpdate(
      { userId, courseId: getCourseByLessonId.courseId },
      {
        progressPercent,
      },
      { upsert: true, new: true }
    );
  }
}

/**
 * Gets the task's hierarchy (lesson, module, section, course)
 */
export async function getTaskHierarchy(taskId: string) {
  const task = await getDocumentById(taskId);
  if (!task || !task.parentDocumentId) {
    throw new Error(`Task ${taskId} not found or has no parent`);
  }

  const lessonId = task.parentDocumentId;
  return getCourseById(lessonId);
}
