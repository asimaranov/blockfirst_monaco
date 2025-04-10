import mongoose from 'mongoose';

// Interface for blogger promo code data
export interface IPromoCode {
  code: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Manager user ID
  referralPercent: number; // Percentage to override the default referral revenue percent
  usedBy?: string; // User ID who used the code
  usedAt?: Date;
  id?: string;
}

const PromoCodeSchema = new mongoose.Schema<IPromoCode>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    referralPercent: {
      type: Number,
      required: true,
      min: 1,
      max: 99, // Maximum allowed percentage
      default: 5,
    },
    usedBy: {
      type: String,
      index: true,
    },
    usedAt: {
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
        return ret;
      },
    },
  }
);

export const PromoCodeModel =
  (mongoose.models.PromoCode as mongoose.Model<IPromoCode>) ||
  mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema, 'promo_codes');

export default PromoCodeModel;
