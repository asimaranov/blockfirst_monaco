import mongoose from 'mongoose';
import { formatRelativeTime } from '~/app/lib/utils';
import {
  VacancyFormat,
  VacancyCurrency,
  VacancySpeciality,
} from '~/app/lib/constants/vacancies';

// Interface for vacancy
export interface IVacancy {
  id?: string;
  title: string;
  description: string;
  updatedAt: Date;
  publishedDate: Date; // New field for publication date
  speciality: VacancySpeciality | string;
  format: VacancyFormat | [VacancyFormat, VacancyFormat];
  salary?: {
    amount: number | { from?: number; to?: number };
    currency: VacancyCurrency;
  };
  publisher: {
    name: string;
    contacts: {
      telegram: string;
      cite: string;
      email: string;
    };
  };
  responsibilities: string[];
  requirements: string[];
  // Fields added on JSON response but not in DB
  applied?: boolean;
  appliedAt?: Date;
  applicationType?: 'link' | 'copy' | 'other';
  createdAt?: Date;
  isPersonal?: boolean;
  userId?: string; // ID of the user this vacancy is for (if it's a personal vacancy)
}

// Create a schema for the salary amount
const SalaryAmountSchema = new mongoose.Schema(
  {
    from: {
      type: Number,
    },
    to: {
      type: Number,
    },
  },
  { _id: false }
);

// Create a schema for the salary
const SalarySchema = new mongoose.Schema(
  {
    amount: {
      type: mongoose.Schema.Types.Mixed,
      validate: {
        validator: function (v: any) {
          // Check if it's a number
          if (typeof v === 'number') {
            return true;
          }

          // Check if it's an object with from/to properties
          if (typeof v === 'object') {
            return 'from' in v || 'to' in v;
          }

          return false;
        },
        message:
          'Salary amount must be a number or an object with from/to properties',
      },
    },
    currency: {
      type: String,
      enum: Object.values(VacancyCurrency),
      required: true,
    },
  },
  { _id: false }
);

// Create a schema for the publisher contacts
const PublisherContactsSchema = new mongoose.Schema(
  {
    telegram: { type: String, required: true },
    cite: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

// Create a schema for the publisher
const PublisherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contacts: { type: PublisherContactsSchema, required: true },
  },
  { _id: false }
);

// Create the main vacancy schema
const VacancySchema = new mongoose.Schema<IVacancy>(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
      index: true, // Index for efficient sorting by publication date
    },
    speciality: {
      type: String,
      required: true,
      index: true,
    },
    format: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (v: any) {
          if (typeof v === 'string') {
            return Object.values(VacancyFormat).includes(v as VacancyFormat);
          }

          if (Array.isArray(v) && v.length === 2) {
            return v.every((format) =>
              Object.values(VacancyFormat).includes(format as VacancyFormat)
            );
          }

          return false;
        },
        message:
          'Format must be a valid VacancyFormat or an array of two VacancyFormats',
      },
    },
    salary: {
      type: SalarySchema,
    },
    publisher: {
      type: PublisherSchema,
      required: true,
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    isPersonal: {
      type: Boolean,
      default: false,
      index: true,
    },
    userId: {
      type: String,
      sparse: true,
      index: true,
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

        // Convert updatedAt to ISO string for frontend compatibility
        if (ret.updatedAt) {
          ret.updatedAt = new Date(ret.updatedAt).toISOString().split('T')[0];
        }

        // Convert publishedDate to ISO string for frontend compatibility
        if (ret.publishedDate) {
          ret.publishedDate = new Date(ret.publishedDate)
            .toISOString()
            .split('T')[0];
        }

        return ret;
      },
    },
  }
);

export const VacancyModel =
  (mongoose.models.Vacancy as mongoose.Model<IVacancy>) ||
  mongoose.model<IVacancy>('Vacancy', VacancySchema, 'vacancies');

export default VacancyModel;
