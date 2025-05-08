import mongoose, { Document, Model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';

export interface IExamRating extends Document {
  _id: string;
  userId: string;
  examId: string;
  rating: number; // 1-5 rating
  createdAt: Date;
  updatedAt: Date;
}

const examRatingSchema = new Schema<IExamRating>(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    examId: {
      type: String,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Add compound index to ensure uniqueness of userId+examId pair
// This prevents duplicate ratings from the same user for the same exam
examRatingSchema.index({ userId: 1, examId: 1 }, { unique: true });

// Create or retrieve the ExamRating model
const ExamRatingModel: Model<IExamRating> =
  (mongoose.models.ExamRating as mongoose.Model<IExamRating>) ||
  mongoose.model<IExamRating>('ExamRating', examRatingSchema);

export default ExamRatingModel;
