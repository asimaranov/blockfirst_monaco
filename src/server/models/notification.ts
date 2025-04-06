import mongoose from 'mongoose';
import { formatRelativeTime } from '~/app/lib/utils';

// Interface definitions for notification types
export interface IBaseNotification {
  timestamp: string;
  category: string;
  isRead: boolean;
  isArchived: boolean;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  id: string;
}

export interface ISystemNotification extends IBaseNotification {
  type: 'system';
  title: string;
  message: string;
  highlightedBorder?: boolean;
}

export interface ICommentNotification extends IBaseNotification {
  type: 'comment';
  username: string;
  course: string;
  message: string;
}

export interface ILikeNotification extends IBaseNotification {
  type: 'like';
  username: string;
  course: string;
}

export interface IPromoNotification extends IBaseNotification {
  type: 'promo';
  title: string;
  description?: string;
  image: string;
}

export type INotification =
  | ISystemNotification
  | ICommentNotification
  | ILikeNotification
  | IPromoNotification;

// Base schema for all notification types
const baseNotificationSchema = {
  timestamp: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
};

// Schema for notifications with discriminator
const NotificationSchema = new mongoose.Schema<INotification>(
  {
    ...baseNotificationSchema,
    type: {
      type: String,
      required: true,
      enum: ['system', 'comment', 'like', 'promo'],
    },
  },
  {
    // timestamps: true,
    discriminatorKey: 'type',
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        if (ret.timestamp) {
          ret.timestamp = formatRelativeTime(new Date(ret.timestamp));
        }

        // Add formatted date for createdAt and updatedAt
        if (ret.createdAt) {
          ret.createdAt = formatRelativeTime(new Date(ret.createdAt));
        }
        if (ret.updatedAt) {
          ret.updatedAt = formatRelativeTime(new Date(ret.updatedAt));
        }

        return ret;
      },
    },
  }
);

// Create the base model
const NotificationModel =
  (mongoose.models.Notification as mongoose.Model<INotification>) ||
  mongoose.model('Notification', NotificationSchema, 'notifications');

// Create discriminators for each notification type
const SystemNotification =
  (mongoose.models.system as mongoose.Model<ISystemNotification>) ||
  NotificationModel.discriminator(
    'system',
    new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      highlightedBorder: {
        type: Boolean,
        default: false,
      },
    })
  );

const CommentNotification =
  (mongoose.models.comment as mongoose.Model<ICommentNotification>) ||
  NotificationModel.discriminator(
    'comment',
    new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      course: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    })
  );

const LikeNotification =
  (mongoose.models.like as mongoose.Model<ILikeNotification>) ||
  NotificationModel.discriminator(
    'like',
    new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      course: {
        type: String,
        required: true,
      },
    })
  );

const PromoNotification =
  (mongoose.models.promo as mongoose.Model<IPromoNotification>) ||
  NotificationModel.discriminator(
    'promo',
    new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    })
  );

export {
  NotificationModel,
  SystemNotification,
  CommentNotification,
  LikeNotification,
  PromoNotification,
};

export default NotificationModel;
