import mongoose from 'mongoose';

// Define the schema for tracking user progress on individual tasks
const UserTaskProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    taskId: { type: String, required: true, index: true },
    status: {
      type: String,
      required: true,
      enum: ['available', 'in-progress', 'completed'],
      default: 'available',
    },
    advancedTasksSolved: { type: Boolean, default: false },
    completedAt: { type: Date },
    submissionCount: { type: Number, default: 0 },
    lastSubmittedAt: { type: Date },
  },
  { timestamps: true }
);

// Create a compound index for faster lookups
UserTaskProgressSchema.index({ userId: 1, taskId: 1 }, { unique: true });

// Define the schema for tracking user progress on lessons
const UserLessonProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    lessonId: { type: String, required: true, index: true },
    status: {
      type: String,
      required: true,
      enum: [
        'available',
        'in-progress',
        'completed',
        'completedNoExtra',
        'skipped',
      ],
      default: 'available',
    },
    completedAt: { type: Date },
    completedTasksCount: { type: Number, default: 0 },
    totalTasksCount: { type: Number, default: 0 },
    completedAdvancedTasksCount: { type: Number, default: 0 },
    totalAdvancedTasksCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create a compound index for faster lookups
UserLessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

// Define the schema for tracking user progress on courses
const UserCourseProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    courseId: { type: String, required: true, index: true },

    progressPercent: { type: Number, default: 0 },
    
    solvedLessonsCount: { type: Number, default: 0 },
    totalLessonsCount: { type: Number, default: 0 },

    lastLessonId: { type: String, default: '' },
  },
  { timestamps: true }
);

// Create a compound index for faster lookups
UserCourseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Define interfaces
export interface IUserTaskProgress extends mongoose.Document {
  userId: string;
  taskId: string;
  status: 'available' | 'in-progress' | 'completed';
  advancedTasksSolved: boolean;
  completedAt?: Date;
  submissionCount: number;
  lastSubmittedAt?: Date;
}

export interface IUserLessonProgress extends mongoose.Document {
  userId: string;
  lessonId: string;
  status:
    | 'available'
    | 'in-progress'
    | 'completed'
    | 'completedNoExtra'
    | 'skipped';
  completedAt?: Date;
  completedTasksCount: number;
  totalTasksCount: number;
  completedAdvancedTasksCount: number;
  totalAdvancedTasksCount: number;
}

export interface IUserModuleProgress extends mongoose.Document {
  userId: string;
  moduleId: string;
  status: 'available' | 'in-progress' | 'completed' | 'locked' | 'upcoming';
  completedAt?: Date;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export interface IUserSectionProgress extends mongoose.Document {
  userId: string;
  sectionId: string;
  status: 'available' | 'in-progress' | 'completed' | 'locked' | 'upcoming';
  finalTestStatus: 'available' | 'completed' | 'locked';
  completedAt?: Date;
  completedModulesCount: number;
  totalModulesCount: number;
}

export interface IUserCourseProgress extends mongoose.Document {
  userId: string;
  courseId: string;
  status: 'available' | 'in-progress' | 'completed' | 'locked';
  completedAt?: Date;
  completedSectionsCount: number;
  totalSectionsCount: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

// Create the models
export const UserTaskProgress =
  mongoose.models.UserTaskProgress ||
  mongoose.model<IUserTaskProgress>('UserTaskProgress', UserTaskProgressSchema);

export const UserLessonProgress =
  mongoose.models.UserLessonProgress ||
  mongoose.model<IUserLessonProgress>(
    'UserLessonProgress',
    UserLessonProgressSchema
  );

export const UserCourseProgress =
  mongoose.models.UserCourseProgress ||
  mongoose.model<IUserCourseProgress>(
    'UserCourseProgress',
    UserCourseProgressSchema
  );
