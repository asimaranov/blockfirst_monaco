import mongoose from 'mongoose';
import { formatRelativeTime } from '~/app/lib/utils';

// Interface for newsletter subscribers
export interface ISubscriber {
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  id?: string;
}

const SubscriberSchema = new mongoose.Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
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

export const SubscriberModel =
  (mongoose.models.Subscriber as mongoose.Model<ISubscriber>) ||
  mongoose.model<ISubscriber>('Subscriber', SubscriberSchema, 'subscribers');

export default SubscriberModel; 