import mongoose from 'mongoose';

// Interface for referral code data
export interface IReferralCode {
  userId: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  id?: string;
}

const ReferralCodeSchema = new mongoose.Schema<IReferralCode>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    usageCount: {
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
        return ret;
      },
    },
  }
);

export const ReferralCodeModel =
  (mongoose.models.ReferralCode as mongoose.Model<IReferralCode>) ||
  mongoose.model<IReferralCode>(
    'ReferralCode',
    ReferralCodeSchema,
    'referral_codes'
  );

export default ReferralCodeModel;
