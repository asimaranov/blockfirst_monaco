import mongoose from 'mongoose';
import { formatRelativeTime } from '~/app/lib/utils';
// Interface definition for NotificationSetting
export interface INotificationSetting {
  userId: string;
  settings: {
    news: boolean;
    comments: boolean;
    jobs: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  id?: string;
}

const NotificationSettingSchema = new mongoose.Schema<INotificationSetting>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      unique: true, // Make userId unique since we'll have only one record per user
    },
    settings: {
      news: {
        type: Boolean,
        default: true,
      },
      comments: {
        type: Boolean,
        default: true,
      },
      jobs: {
        type: Boolean,
        default: false,
      },
    },
    // Standard timestamps
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
    timestamps: true, // automatically handle createdAt and updatedAt
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
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

export const NotificationSettingModel =
  (mongoose.models
    .NotificationSetting as mongoose.Model<INotificationSetting>) ||
  mongoose.model<INotificationSetting>(
    'NotificationSetting',
    NotificationSettingSchema,
    'notification_settings'
  );

export default NotificationSettingModel;
