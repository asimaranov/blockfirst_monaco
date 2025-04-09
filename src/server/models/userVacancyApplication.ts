import mongoose from 'mongoose';
import { formatRelativeTime } from '~/app/lib/utils';

// Interface for user vacancy applications
export interface IUserVacancyApplication {
  id?: string;
  userId: string;
  vacancyId: string;
  appliedAt: Date;
  applicationType: 'link' | 'copy' | 'other'; // Track how the user applied
  createdAt: Date;
  updatedAt: Date;
}

// Create the user vacancy application schema
const UserVacancyApplicationSchema =
  new mongoose.Schema<IUserVacancyApplication>(
    {
      userId: {
        type: String,
        required: true,
        index: true,
      },
      vacancyId: {
        type: String,
        required: true,
        index: true,
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
      applicationType: {
        type: String,
        enum: ['link', 'copy', 'other'],
        required: true,
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

          // Add formatted date for appliedAt
          if (ret.appliedAt) {
            ret.formattedAppliedAt = formatRelativeTime(
              new Date(ret.appliedAt)
            );
          }

          return ret;
        },
      },
    }
  );

// Create a compound index for userId and vacancyId to ensure uniqueness
UserVacancyApplicationSchema.index(
  { userId: 1, vacancyId: 1 },
  { unique: true }
);

export const UserVacancyApplicationModel =
  (mongoose.models
    .UserVacancyApplication as mongoose.Model<IUserVacancyApplication>) ||
  mongoose.model<IUserVacancyApplication>(
    'UserVacancyApplication',
    UserVacancyApplicationSchema,
    'user_vacancy_applications'
  );

export default UserVacancyApplicationModel;
