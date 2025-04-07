import mongoose from 'mongoose';
import { formatRelativeTime } from '~/app/lib/utils';

// Interface for form submissions
export interface IFormSubmission {
  formType:
    | 'student'
    | 'usdt'
    | 'promoCode'
    | 'cvApply'
    | 'mentor'
    | 'changeCurator';
  status: 'pending' | 'processed' | 'rejected';

  // Student form fields
  name?: string;
  telegram?: string;
  motivation?: string;

  // USDT form fields
  transactionId?: string;
  amountPaid?: number;

  // Promo code fields
  promoCode?: string;

  // CV Apply fields
  jobTitle?: string;
  additionalInfo?: string;

  // Mentor form fields
  course?: string;

  // Common fields
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  adminNotes?: string;
  id?: string;
}

const FormSubmissionSchema = new mongoose.Schema<IFormSubmission>(
  {
    formType: {
      type: String,
      required: true,
      enum: [
        'student',
        'usdt',
        'promoCode',
        'cvApply',
        'mentor',
        'changeCurator',
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'processed', 'rejected'],
      default: 'pending',
    },

    // Student form fields
    name: {
      type: String,
      trim: true,
    },
    telegram: {
      type: String,
      trim: true,
    },
    motivation: {
      type: String,
    },

    // USDT form fields
    transactionId: {
      type: String,
      trim: true,
    },
    amountPaid: {
      type: Number,
    },

    // Promo code fields
    promoCode: {
      type: String,
      trim: true,
    },

    // CV Apply fields
    jobTitle: {
      type: String,
      trim: true,
    },
    additionalInfo: {
      type: String,
    },

    // Mentor form fields
    course: {
      type: String,
      trim: true,
    },

    // Common fields
    processedAt: {
      type: Date,
    },
    adminNotes: {
      type: String,
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
        if (ret.processedAt) {
          ret.formattedProcessedAt = formatRelativeTime(
            new Date(ret.processedAt)
          );
        }

        return ret;
      },
    },
  }
);

export const FormSubmissionModel =
  (mongoose.models.FormSubmission as mongoose.Model<IFormSubmission>) ||
  mongoose.model<IFormSubmission>(
    'FormSubmission',
    FormSubmissionSchema,
    'formSubmissions'
  );

export default FormSubmissionModel;
