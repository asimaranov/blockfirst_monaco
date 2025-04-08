import mongoose from 'mongoose';
import { formatRelativeTime } from '~/app/lib/utils';

// Interface for Tron wallets
export interface ITronWallet {
  userId: string;
  tariffName: string; // Corresponds to the tariff being purchased
  address: string;
  privateKey: string; // Encrypted private key
  amount: number; // Amount in USDT expected
  status: 'pending' | 'paid' | 'expired';
  transactionId?: string; // TxID if paid
  expiresAt: Date; // When this wallet expires
  createdAt: Date;
  updatedAt: Date;
  id?: string;
}

const TronWalletSchema = new mongoose.Schema<ITronWallet>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    tariffName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'expired'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      index: true,
    },
    expiresAt: {
      type: Date,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;

        // Add formatted dates
        if (ret.createdAt) {
          ret.formattedCreatedAt = formatRelativeTime(new Date(ret.createdAt));
        }
        if (ret.updatedAt) {
          ret.formattedUpdatedAt = formatRelativeTime(new Date(ret.updatedAt));
        }
        if (ret.expiresAt) {
          ret.formattedExpiresAt = formatRelativeTime(new Date(ret.expiresAt));
        }

        // Mask the private key when sending to client
        if (ret.privateKey) {
          delete ret.privateKey;
        }

        return ret;
      },
    },
  }
);

const TronWalletModel =
  (mongoose.models.TronWallet as mongoose.Model<ITronWallet>) ||
  mongoose.model<ITronWallet>('TronWallet', TronWalletSchema, 'tron_wallets');

export default TronWalletModel;
