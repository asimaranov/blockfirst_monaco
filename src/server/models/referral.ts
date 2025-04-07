import mongoose from 'mongoose';
import { PlanType } from './userData';
import { formatRelativeTime } from '~/app/lib/utils';

// Interface for referral data
export interface IReferral {
  userId: string;
  referrerId: string;
  name: string;
  avatar?: string;
  registrationDate: Date;
  plan: PlanType;
  earnings: number;
  learningTimeMinutes: number;
  createdAt: Date;
  updatedAt: Date;
  id?: string;
}

const ReferralSchema = new mongoose.Schema<IReferral>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    referrerId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro'],
      default: 'free',
      required: true,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    learningTimeMinutes: {
      type: Number,
      default: 0,
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

        // Format registration date as DD.MM.YYYY
        if (ret.registrationDate) {
          const date = new Date(ret.registrationDate);
          ret.formattedRegistrationDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        }

        // Format earnings with currency symbol
        ret.formattedEarnings = `${ret.earnings.toLocaleString('ru-RU')} ₽`;

        // Format learning time as days, hours, minutes
        const totalMinutes = ret.learningTimeMinutes;
        const days = Math.floor(totalMinutes / (60 * 24));
        const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
        const minutes = totalMinutes % 60;

        let formattedLearningTime = '';
        if (days > 0) formattedLearningTime += `${days}д `;
        if (hours > 0 || days > 0) formattedLearningTime += `${hours}ч `;
        if (minutes > 0 && days === 0) formattedLearningTime += `${minutes}м`;

        ret.formattedLearningTime = formattedLearningTime.trim();

        return ret;
      },
    },
  }
);

export const ReferralModel =
  (mongoose.models.Referral as mongoose.Model<IReferral>) ||
  mongoose.model<IReferral>('Referral', ReferralSchema, 'referrals');

export default ReferralModel;
