import mongoose from 'mongoose';
import { formatRelativeTime } from '~/app/lib/utils';

// Plan types
export type PlanType = 'free' | 'starter' | 'pro';

// Interface for course progress
export interface ICourseProgress {
  courseId: string;
  progress: number; // percentage 0-100
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
  lessons: {
    lessonId: string;
    completed: boolean;
    lastAccessedAt?: Date;
  }[];
}

// Interface for user data
export interface IUserData {
  userId: string;
  plan: PlanType;
  coursesProgress: ICourseProgress[];
  telegramAccount?: {
    username: string;
    chatId?: string;
    linkedAt: Date;
  };
  curator: {
    isAssigning: boolean;
    curatorId?: string;
    assignedAt?: Date;
  };
  blogger: {
    isBlogger: boolean;
    referralPercent: number;
    activatedAt?: Date;
    promoCodeId?: string;
  };
  aiTokens: {
    tokensUsedToday: number;
    lastResetDate: Date;
  };
  // Add streak and XP tracking
  streak: {
    count: number; // Current streak count
    lastLoginDate: Date; // Last login date to track streak
    maxCount: number; // All-time max streak
  };
  xp: {
    total: number; // Total XP accumulated
    history: {
      // History of XP earned
      date: Date;
      amount: number;
      source: string; // Where XP was earned from (login, lesson, etc)
    }[];
  };
  premiumStartDate?: Date;
  premiumEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  id?: string;
}

const CourseProgressSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    lessons: [
      {
        lessonId: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        lastAccessedAt: {
          type: Date,
        },
      },
    ],
  },
  { _id: false }
);

// Schema for XP history entries
const XpHistoryEntrySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const UserDataSchema = new mongoose.Schema<IUserData>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro'],
      default: 'free',
      required: true,
    },
    coursesProgress: [CourseProgressSchema],
    telegramAccount: {
      username: String,
      chatId: String,
      linkedAt: {
        type: Date,
      },
    },
    curator: {
      isAssigning: {
        type: Boolean,
        default: false,
      },
      curatorId: String,
      assignedAt: Date,
    },
    blogger: {
      isBlogger: {
        type: Boolean,
        default: false,
      },
      referralPercent: {
        type: Number,
        default: 3,
        min: 1,
        max: 25,
      },
      activatedAt: {
        type: Date,
      },
      promoCodeId: {
        type: String,
      },
    },
    aiTokens: {
      tokensUsedToday: {
        type: Number,
        default: 0,
      },
      lastResetDate: {
        type: Date,
        default: Date.now,
      },
    },
    // Add streak tracking
    streak: {
      count: {
        type: Number,
        default: 0,
      },
      lastLoginDate: {
        type: Date,
        default: Date.now,
      },
      maxCount: {
        type: Number,
        default: 0,
      },
    },
    // Add XP tracking
    xp: {
      total: {
        type: Number,
        default: 0,
      },
      history: [XpHistoryEntrySchema],
    },
    premiumStartDate: {
      type: Date,
    },
    premiumEndDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;

        // Add formatted date for createdAt and updatedAt
        if (ret.createdAt) {
          ret.formattedCreatedAt = formatRelativeTime(new Date(ret.createdAt));
        }
        if (ret.updatedAt) {
          ret.formattedUpdatedAt = formatRelativeTime(new Date(ret.updatedAt));
        }

        return ret;
      },
    },
  }
);

export const UserDataModel =
  (mongoose.models.UserData as mongoose.Model<IUserData>) ||
  mongoose.model<IUserData>('UserData', UserDataSchema, 'user_data');

export default UserDataModel;
