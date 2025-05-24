import mongoose, { Document, Model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';

export interface ILessonRating extends Document {
  _id: string;
  userId: string;
  lessonId: string;
  rating: number; // 1-5 rating
  createdAt: Date;
  updatedAt: Date;
}

const lessonRatingSchema = new Schema<ILessonRating>(
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
    lessonId: {
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

// Add compound index to ensure uniqueness of userId+lessonId pair
// This prevents duplicate ratings from the same user for the same lesson
lessonRatingSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

// Create or retrieve the LessonRating model
const LessonRatingModel: Model<ILessonRating> =
  (mongoose.models?.LessonRating as mongoose.Model<ILessonRating>) ||
  mongoose.model<ILessonRating>('LessonRating', lessonRatingSchema);

export default LessonRatingModel;
