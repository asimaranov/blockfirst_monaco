import {
  getCourseById,
  getDocumentChildren,
  getDocumentById,
} from '~/lib/documents';
import {
  UserTaskProgress,
  UserLessonProgress,
  UserModuleProgress,
  UserSectionProgress,
  UserCourseProgress,
} from '~/server/models/UserProgress';

/**
 * Updates a task's status and propagates changes to parent lesson, module, section, and course
 */
export async function updateTaskStatus(
  userId: string,
  taskId: string,
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

  // 2. Get task's parent hierarchy
  const document = await getDocumentById(taskId);
  if (!document || !document.parentDocumentId) {
    console.error(`Task ${taskId} not found or has no parent`);
    return taskProgress;
  }

  const lessonId = document.parentDocumentId;

  // 3. Update lesson progress
  await updateLessonProgress(userId, lessonId);

  return taskProgress;
}

/**
 * Updates a lesson's status based on its tasks and propagates changes upward
 */
export async function updateLessonProgress(userId: string, lessonId: string) {
  // 1. Get all tasks in the lesson
  const tasks = await getDocumentChildren(lessonId);

  if (!tasks.length) {
    console.log(`No tasks found for lesson ${lessonId}`);
    return null;
  }

  // 2. Get progress for all tasks
  const taskIds = tasks.map((task) => task.id);
  const taskProgressRecords = await UserTaskProgress.find({
    userId,
    taskId: { $in: taskIds },
  });

  // 3. Calculate lesson progress
  const totalTasks = tasks.length;
  const completedTasks = taskProgressRecords.filter(
    (record) => record.status === 'completed'
  ).length;
  const completedAdvancedTasks = taskProgressRecords.filter(
    (record) => record.status === 'completed' && record.advancedTasksSolved
  ).length;

  // 4. Determine lesson status
  let status:
    | 'available'
    | 'in-progress'
    | 'completed'
    | 'completedNoExtra'
    | 'skipped' = 'available';

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

  // 5. Update lesson progress
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

  // 6. Get lesson's parent hierarchy and update module progress
  const lesson = await getDocumentById(lessonId);
  if (!lesson || !lesson.parentDocumentId) {
    console.error(`Lesson ${lessonId} not found or has no parent`);
    return lessonProgress;
  }

  const moduleId = lesson.parentDocumentId;
  await updateModuleProgress(userId, moduleId);

  return lessonProgress;
}

/**
 * Updates a module's status based on its lessons and propagates changes upward
 */
export async function updateModuleProgress(userId: string, moduleId: string) {
  // 1. Get all lessons in the module
  const lessons = await getDocumentChildren(moduleId);

  if (!lessons.length) {
    console.log(`No lessons found for module ${moduleId}`);
    return null;
  }

  // 2. Get progress for all lessons
  const lessonIds = lessons.map((lesson) => lesson.id);
  const lessonProgressRecords = await UserLessonProgress.find({
    userId,
    lessonId: { $in: lessonIds },
  });

  // 3. Calculate module progress
  const totalLessons = lessons.length;
  const completedLessons = lessonProgressRecords.filter((record) =>
    ['completed', 'completedNoExtra'].includes(record.status)
  ).length;

  // 4. Determine module status
  let status:
    | 'available'
    | 'in-progress'
    | 'completed'
    | 'locked'
    | 'upcoming' = 'available';

  if (
    completedLessons === 0 &&
    lessonProgressRecords.some((record) => record.status === 'in-progress')
  ) {
    status = 'in-progress';
  } else if (completedLessons === totalLessons) {
    status = 'completed';
  } else if (completedLessons > 0 && completedLessons < totalLessons) {
    status = 'in-progress';
  }

  // 5. Update module progress
  const moduleProgress = await UserModuleProgress.findOneAndUpdate(
    { userId, moduleId },
    {
      status,
      completedLessonsCount: completedLessons,
      totalLessonsCount: totalLessons,
      completedAt: status === 'completed' ? new Date() : undefined,
    },
    { upsert: true, new: true }
  );

  // 6. Get module's parent and update section progress
  const module = await getDocumentById(moduleId);
  if (!module || !module.parentDocumentId) {
    console.error(`Module ${moduleId} not found or has no parent`);
    return moduleProgress;
  }

  const sectionId = module.parentDocumentId;
  await updateSectionProgress(userId, sectionId);

  return moduleProgress;
}

/**
 * Updates a section's status based on its modules and propagates changes upward
 */
export async function updateSectionProgress(userId: string, sectionId: string) {
  // 1. Get all modules in the section
  const modules = await getDocumentChildren(sectionId);

  if (!modules.length) {
    console.log(`No modules found for section ${sectionId}`);
    return null;
  }

  // 2. Get progress for all modules
  const moduleIds = modules.map((module) => module.id);
  const moduleProgressRecords = await UserModuleProgress.find({
    userId,
    moduleId: { $in: moduleIds },
  });

  // 3. Calculate section progress
  const totalModules = modules.length;
  const completedModules = moduleProgressRecords.filter(
    (record) => record.status === 'completed'
  ).length;

  // 4. Determine section status
  let status:
    | 'available'
    | 'in-progress'
    | 'completed'
    | 'locked'
    | 'upcoming' = 'available';
  let finalTestStatus: 'available' | 'completed' | 'locked' = 'locked';

  if (
    completedModules === 0 &&
    moduleProgressRecords.some((record) => record.status === 'in-progress')
  ) {
    status = 'in-progress';
  } else if (completedModules === totalModules) {
    status = 'completed';
    finalTestStatus = 'available';
  } else if (completedModules > 0 && completedModules < totalModules) {
    status = 'in-progress';
  }

  // 5. Update section progress
  const sectionProgress = await UserSectionProgress.findOneAndUpdate(
    { userId, sectionId },
    {
      status,
      finalTestStatus,
      completedModulesCount: completedModules,
      totalModulesCount: totalModules,
      completedAt: status === 'completed' ? new Date() : undefined,
    },
    { upsert: true, new: true }
  );

  // 6. Get section's parent and update course progress
  const section = await getDocumentById(sectionId);
  if (!section || !section.parentDocumentId) {
    console.error(`Section ${sectionId} not found or has no parent`);
    return sectionProgress;
  }

  const courseId = section.parentDocumentId;
  await updateCourseProgress(userId, courseId);

  return sectionProgress;
}

/**
 * Updates a course's status based on its sections
 */
export async function updateCourseProgress(userId: string, courseId: string) {
  // 1. Get all sections in the course
  const sections = await getDocumentChildren(courseId);

  if (!sections.length) {
    console.log(`No sections found for course ${courseId}`);
    return null;
  }

  // 2. Get progress for all sections
  const sectionIds = sections.map((section) => section.id);
  const sectionProgressRecords = await UserSectionProgress.find({
    userId,
    sectionId: { $in: sectionIds },
  });

  // 3. Calculate course progress
  const totalSections = sections.length;
  const completedSections = sectionProgressRecords.filter(
    (record) => record.status === 'completed'
  ).length;

  // Get all modules and lessons to calculate overall course completion
  const moduleIds: string[] = [];
  let totalLessons = 0;
  let completedLessons = 0;

  // Get all modules
  for (const sectionId of sectionIds) {
    const modules = await getDocumentChildren(sectionId);
    moduleIds.push(...modules.map((module) => module.id));
  }

  // Get module progress data
  const moduleProgressRecords = await UserModuleProgress.find({
    userId,
    moduleId: { $in: moduleIds },
  });

  // Sum up lessons
  moduleProgressRecords.forEach((moduleProgress) => {
    totalLessons += moduleProgress.totalLessonsCount;
    completedLessons += moduleProgress.completedLessonsCount;
  });

  // 4. Determine course status
  let status: 'available' | 'in-progress' | 'completed' | 'locked' =
    'available';

  if (
    completedSections === 0 &&
    sectionProgressRecords.some((record) => record.status === 'in-progress')
  ) {
    status = 'in-progress';
  } else if (completedSections === totalSections) {
    status = 'completed';
  } else if (completedSections > 0 && completedSections < totalSections) {
    status = 'in-progress';
  }

  // 5. Update course progress
  const courseProgress = await UserCourseProgress.findOneAndUpdate(
    { userId, courseId },
    {
      status,
      completedSectionsCount: completedSections,
      totalSectionsCount: totalSections,
      completedLessonsCount: completedLessons,
      totalLessonsCount: totalLessons,
      completedAt: status === 'completed' ? new Date() : undefined,
    },
    { upsert: true, new: true }
  );

  return courseProgress;
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
